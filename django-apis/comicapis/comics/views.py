import datetime
from django.conf import settings
from django.db.models import F
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Chapter, Comic, ComicView, Comment, Rating, User
from .paginators import BasePagination
from .serializers import (CategorySerializer, ChapterSerializer,
                          ComicDetailSerializer, ComicDetailTypeLessSerializer, ComicSerializer,
                          ComicViewSerializer, CommentSerializer,
                          RatingSerializer, UserSerializer)


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


"""
Comic List   : comics/
Comic Detail : comics/{slug}
Comment List : comics/{slug}/comments
Add comment  : comics/{slug}/add-comment
rate comic   : comics/{slug}/rating
"""


class ComicViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = ComicSerializer
    pagination_class = BasePagination
    lookup_field = "slug"

    def get_permissions(self):
        if self.action in ['add_comment', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        comics = Comic.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            comics = comics.filter(title__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id is not None:
            comics = comics.filter(categories=cate_id)

        return comics

    def get_serializer_class(self):
        type = self.request.query_params.get('type')
        if type is not None and type == 'less':
            return ComicDetailTypeLessSerializer
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
        comic = self.get_object()
        comments = comic.comment_set.order_by("-id").all()

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

        return Response(CommentSerializer(comments, many=True, context={"request": self.request}).data,
                        status=status.HTTP_200_OK)

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


"""
Chapter List   : comics/{slug}/chapters/
Chapter Detail : comics/{slug}/{slug}
Increase views : comics/{slug}/chapters/{slug}/views
"""


class ChapterViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Chapter.objects.filter(active=True)
    serializer_class = ChapterSerializer
    pagination_class = BasePagination
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
        comic = Comic.objects.get(slug=comic_slug)
        view, created = ComicView.objects.get_or_create(comic=comic)
        view.views = F('views') + 1
        view.save()

        view.refresh_from_db()

        return Response(ComicViewSerializer(view).data, status=status.HTTP_200_OK)


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
            print('test')
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


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = BasePagination

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
