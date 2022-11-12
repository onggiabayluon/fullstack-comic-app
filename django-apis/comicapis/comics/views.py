import stripe
from comics.utils import get_or_none, image_upload
from django.db.models import F
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from comicapis import settings

from .models import (Bookmark, Category, Chapter, ChapterView, Comic, Comment,
                     Payment, Product, Rating, User)
from .paginators import BasePagination, ComicPagniation, CommentPagination
from .serializers import (BookmarkSerializer, CategoryDetailSerializer,
                          CategorySerializer, ChapterSerializer,
                          ChapterViewSerializer, CoinSerializer,
                          ComicDetailSerializer, ComicDetailTypeLessSerializer,
                          ComicSerializer, CommentSerializer,
                          MyTokenObtainPairSerializer, RatingSerializer,
                          RegisterSerializer, UserBookmarkSerializer,
                          UserSerializer)

stripe.api_key = settings.STRIPE_API_KEY
endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
"""
Stripe Payment View   : /create-payment-intent
"""


class BuyCoin(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # >>> Handling Stripe Payment
        if request.method == 'POST':
            user = request.user
            product = Product.objects.get(id=request.data.get('coin'))
            token = request.data.get('stripeToken')
            amount = product.price

            try:
                charge = stripe.Charge.create(
                    amount=amount,  # cent
                    currency="usd",
                    source=token,
                )
                # Create The Payment
                Payment.objects.create(user=user, stripe_charge_id=charge.id, amount=amount)

                return Response({'message': "Your order was successful!", 'redirect': '/buy-coin'}, status=status.HTTP_200_OK)

            except stripe.error.CardError as e:
                return Response({'message': str(e)}, status=status.HTTP_403_FORBIDDEN)

            except stripe.error.RateLimitError as e:
                # Too many requests made to the API too quickly
                return Response({'message': 'Rate limit error'}, status=status.HTTP_403_FORBIDDEN)

            except stripe.error.InvalidRequestError as e:
                # Invalid parameters were supplied to Stripe's API
                return Response({'message': 'Invalid parameters'}, status=status.HTTP_403_FORBIDDEN)

            except stripe.error.AuthenticationError as e:
                # Authentication with Stripe's API failed
                # (maybe you changed API keys recently)
                return Response({'message': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            except stripe.error.APIConnectionError as e:
                # Network communication with Stripe failed
                return Response({'message': 'Network error'}, status=status.HTTP_403_FORBIDDEN)

            except stripe.error.StripeError as e:
                # Display a very generic error to the user, and maybe send
                # yourself an email
                return Response({'message': 'Something went wrong. You were not charged. Please try again.'}, status=status.HTTP_403_FORBIDDEN)

            except Exception as e:
                # send an email to ourselves
                return Response({'message': 'A serious error occurred. We have been notifed.'}, status=status.HTTP_403_FORBIDDEN)


class CreateCheckoutSection(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        coin_selected_id = request.data.get('coin')
        coin = Product.objects.get(id=coin_selected_id)
        coin_stripe_price_id = coin.stripe_price_id
        payment = Payment.objects.create(user=request.user, amount=coin.price, is_complete=False)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        'price': coin_stripe_price_id,
                        'quantity': 1,
                    },
                ],
                client_reference_id=request.user.id,
                metadata={'product_type': Product.TYPES.COIN, 'product_id': coin.id, 'paymentId': payment.id},
                mode='payment',
                success_url=settings.CLIENT_SIDE_DOMAIN + '/buy-coin?success=true',
                cancel_url=settings.CLIENT_SIDE_DOMAIN + '/buy-coin?canceled=true',
            )

            return Response({'redirect_to': checkout_session.url}, status=status.HTTP_200_OK)

            # return Response({
            #     'clientSecret': intent['client_secret']
            # }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)


class CheckoutWebhook(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            print(e)
            # Invalid payload
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # verify that it came from Stripe before trusting it
        # Then Handle the checkout.session.completed event
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']

            # Fulfill the purchase...
            fulfill_order(session)

        # Passed signature verification
        return Response({"message": 'Order Fulfilled'}, status=status.HTTP_200_OK)


def fulfill_order(session):
    try:
        user = User.objects.get(id=session.client_reference_id)
        product_type = session.metadata.product_type
        product_id = session.metadata.product_id
        payment_id = session.metadata.paymentId
        amount_total = session.amount_total
        # Save Order to db
        Payment.objects.filter(id=payment_id).update(stripe_charge_id=session.id, product_id=product_id, is_complete=True)

        # If order type == COIN => increase user coin
        if (product_type == Product.TYPES.COIN):
            user.coins += amount_total
            user.save()

        # sent user email
    except Exception as e:
        print(e)


"""
Register View   : /coin
"""


class CoinViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Product.objects.filter(category=Product.TYPES.COIN).order_by('price')
    serializer_class = CoinSerializer


"""
Register View   : api/
"""


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": MyTokenObtainPairSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        }, status=status.HTTP_201_CREATED)


"""
Comic List   : comics/
Comic Detail : comics/{slug}
Comment List : comics/{slug}/comments
Add comment  : comics/{slug}/add-comment
rate comic   : comics/{slug}/rating
bookmark comic   : comics/{slug}/bookmark
"""


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_class(self):
        type = self.request.query_params.get('type')
        if type is not None and type == 'detail':
            return CategoryDetailSerializer
        else:
            return CategorySerializer


class ComicViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = ComicSerializer
    pagination_class = ComicPagniation
    lookup_field = "slug"

    def get_permissions(self):
        if self.action in ['add_comment', 'rate', 'bookmark']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        comics = Comic.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            comics = comics.filter(title__icontains=q)

        cate_name = self.request.query_params.get('category')
        if cate_name is not None:
            cate_name = cate_name.lower()
            if cate_name == 'all':
                return comics
            else:
                comics = comics.filter(categories__name__icontains=cate_name)

        return comics

    def get_serializer_class(self):
        type = self.request.query_params.get('type')
        if type is not None and type == 'less':
            return ComicDetailTypeLessSerializer
        # if type is not None and type == 'detail':
            # return ComicDetailTypeDetailSerializer
        if self.action == 'list':
            return ComicSerializer
        if self.action == 'retrieve':
            return ComicDetailSerializer

    @action(methods=['post'], detail=True, url_path="add-comment")
    def add_comment(self, request, slug):
        # Check if this is a reply
        reply_to = request.data.get('reply_to')
        comment_object = None
        if reply_to:
            comment_object = Comment.objects.get(pk=reply_to)

        content = request.data.get('content')
        user = request.user

        if content:
            comment = Comment.objects.create(content=content,
                                             reply_to=comment_object,
                                             comic=self.get_object(),
                                             creator=user)

            return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path="comments")
    def get_comments(self, request, slug):
        self.pagination_class = CommentPagination
        comic = self.get_object()
        comments = comic.comment_set.order_by("-id").all()
        root_comments = comments.filter(reply_to=None)
        paginated_root_comments = self.paginate_queryset(root_comments)
        paginated_root_comments_id = [c.id for c in paginated_root_comments]
        # CAN'T concat a list and a queryset => convert this shit to list
        root_comments_replies = list(comments.filter(reply_to__in=paginated_root_comments_id))

        paginated_res = paginated_root_comments + root_comments_replies

        filter_list = ["comic_id", "content", "created_date", "creator_id", "id", "updated_date",
                       "-comic_id", "-content", "-created_date", "-creator_id", "-id", "-updated_date"]

        # Filter by order
        sort = self.request.query_params.get('sort')
        if sort is not None:
            sort = sort.split(", ")
            sort = [s.strip() for s in sort]
            # check if sort item is in filter_list
            if any(elem in filter_list for elem in sort):
                comments = comments.extra(order_by=sort)

        return self.get_paginated_response(CommentSerializer(paginated_res, many=True, context={"request": self.request}).data)

    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, slug):
        try:
            rating = int(request.data['rating'])
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            rating, created = Rating.objects.update_or_create(creator=request.user,
                                                              comic=self.get_object(),
                                                              defaults={"rate": rating})

            return Response(RatingSerializer(rating).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='bookmark')
    def bookmark(self, request, slug):
        try:
            comic = self.get_object()
            bookmark = Bookmark.objects.get(creator=request.user, comic=comic).delete()
            return Response({"message": "Delete bookmark successfully."}, status=status.HTTP_200_OK)
        except Bookmark.DoesNotExist:
            bookmark = Bookmark.objects.create(creator=request.user, comic=comic)
            return Response(BookmarkSerializer(bookmark).data, status=status.HTTP_201_CREATED)


"""
Chapter List   : comics/{slug}/chapters/
Chapter Detail : comics/{slug}/{slug}
Increase views : comics/{slug}/chapters/{slug}/views
"""


class ChapterViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Chapter.objects.filter(active=True)
    serializer_class = ChapterSerializer
    # pagination_class = BasePagination
    lookup_field = "slug"


class ChapterDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    # queryset = Chapter.objects.filter(active=True)
    serializer_class = ChapterSerializer
    # pagination_class = BasePagination
    lookup_field = "slug"

    def get_queryset(self):
        comic_slug = self.kwargs.get('comic_slug')
        chapter_slug = self.kwargs.get('slug')
        chapter = Comic.objects.get(slug=comic_slug).chapters.filter(active=True, slug=chapter_slug)
        return chapter


class ChapterViewsViewSet(APIView):
    def get(self, request, comic_slug, slug):
        chapter = Chapter.objects.get(comic__slug=comic_slug, slug=slug)
        view, created = ChapterView.objects.get_or_create(chapter=chapter)
        view.views = F('views') + 1
        view.save()

        view.refresh_from_db()

        return Response(ChapterViewSerializer(view).data, status=status.HTTP_200_OK)


class CheckChapterPaymentByCurentUser(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, comic_slug, slug):
        user = request.user
        chapter = Chapter.objects.get(comic__slug=comic_slug, slug=slug)
        user_payment = get_or_none(Payment, category=Product.TYPES.CHAPTER, chapter=chapter, user=user, is_complete=True)
        if user_payment is not None:
            return Response({'owned': True, 'message': 'Chapter has already payed by user'}, status=status.HTTP_200_OK)

        return Response({'owned': False, 'message': 'User has not owned this chapter'}, status=status.HTTP_200_OK)


class BuyChapter(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comic_slug, slug):
        user = request.user
        chapter = Chapter.objects.get(comic__slug=comic_slug, slug=slug)

        if user.coins >= chapter.price:
            user_payment, created = Payment.objects.get_or_create(category=Product.TYPES.CHAPTER, chapter=chapter, user=user, amount=chapter.price, is_complete=True)
            success_message = "Chapter " + str(chapter.id) + " has been bought successfully by user " + user.username
            if created:
                user.coins -= chapter.price
                user.save()
                return Response({'bought': True, 'message': success_message}, status=status.HTTP_200_OK)
            if user_payment is not None:
                return Response({'bought': True, 'message': 'User already owned this chapter'}, status=status.HTTP_200_OK)

        error_message = "user not have enough coins to buy this chapter, require: " + str(chapter.price) + " owned: " + str(user.coins)
        return Response({'bought': False, 'message': error_message}, status=status.HTTP_200_OK)


"""
Update Comment   : comments/{id}
Delete Comment   : comments/{id}
"""


class CommentViewSet(viewsets.ViewSet, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = BasePagination
    # permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['get_replies']:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(methods=['get'], detail=True, url_path="replies")
    def get_replies(self, request, pk):
        try:
            comment = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            replies = comment.replies.all()
            filter_list = ["comic_id", "content", "created_date", "creator_id", "id", "updated_date",
                           "-comic_id", "-content", "-created_date", "-creator_id", "-id", "-updated_date"]

            # Filter by order
            sort = self.request.query_params.get('sort')
            if sort is not None:
                sort = sort.split(", ")
                sort = [s.strip() for s in sort]
                # check if sort item is in filter_list
                if any(elem in filter_list for elem in sort):
                    replies = replies.extra(order_by=sort)

            return Response(CommentSerializer(replies, many=True, context={"request": self.request}).data,
                            status=status.HTTP_200_OK)


"""
create user         : users/
get current user    : users/current-user
"""


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = BasePagination
    parser_class = (MultiPartParser,)

    def get_permissions(self):
        if self.action == ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='current-user-bookmarks')
    def get_bookmarks(self, request):
        self.pagination_class = None
        return Response(UserBookmarkSerializer(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        photo = request.FILES.get('avatar')
        user = request.user
        user.avatar = photo
        user.save()
        data = UserSerializer(user).data

        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_path='edit')
    def edit_profile(self, request):
        # try:
        photo = request.FILES.get('photo')
        image_url = image_upload(photo, "users/")
        user = request.user
        user.avatar = image_url
        user.save()
        data = UserSerializer(user).data
        return Response(data, status=status.HTTP_200_OK)
        # except Exception as e:
        # print(e)
        # Response({'message': 'upload err'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # else:

        # class AuthInfo(APIView):
        # def get(self, request):
        # return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
