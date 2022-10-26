from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

# Router Register Views
router = routers.DefaultRouter()
# router.register('payment', views.CreatePayment, 'payment')
router.register('coins', views.CoinViewSet, 'coin')
router.register('categories', views.CategoryViewSet, 'category')
router.register('comics', views.ComicViewSet, 'comic')
router.register('chapters', views.ChapterViewSet, 'chapter')
router.register('comments', views.CommentViewSet, 'comment')
router.register('users', views.UserViewSet, 'User')

# Custom views
chapter_list = views.ChapterViewSet.as_view({'get': 'list'})
chapter_detail = views.ChapterDetailViewSet.as_view({'get': 'retrieve'})
chapter_detail_views = views.ChapterViewsViewSet.as_view()

# Stripe
buy_coin = views.BuyCoin.as_view()
create_payment = views.CreateCheckoutSection.as_view()
checkout_webhook = views.CheckoutWebhook.as_view()


urlpatterns = [
    path('', include(router.urls)),
    path('comics/<str:comic_slug>/chapters', chapter_list),
    path('comics/<str:comic_slug>/<str:slug>', chapter_detail),
    path('comics/<str:comic_slug>/<str:slug>/views', chapter_detail_views),
    # Stripe
    path('buy-coin', buy_coin),
    path('create-payment', create_payment),
    path('checkout-webhook', checkout_webhook),
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # path('auth2-info', views.AuthInfo.as_view()),
    # JWT Token
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.RegisterView.as_view(), name='auth_register'),
]
