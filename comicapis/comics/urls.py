from django.urls import include, path

from rest_framework import routers

from . import views

# Router Register Views
router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, 'category')
router.register('comics', views.ComicViewSet, 'comic')
router.register('comments', views.CommentViewSet, 'comment')
router.register('users', views.UserViewSet, 'User')

# Custom views
chapter_list = views.ChapterViewSet.as_view({'get': 'list'})
chapter_detail = views.ChapterDetailViewSet.as_view({'get': 'retrieve'})
chapter_detail_views = views.ChapterViewsViewSet.as_view()


urlpatterns = [
    path('', include(router.urls)),
    path('comics/<str:comic_slug>/chapters', chapter_list),
    path('comics/<str:comic_slug>/<str:slug>', chapter_detail),
    path('comics/<str:comic_slug>/<str:slug>/views', chapter_detail_views),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('auth2-info', views.AuthInfo.as_view()),
]
