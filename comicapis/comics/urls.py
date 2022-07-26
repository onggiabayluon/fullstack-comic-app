from django.urls import include, path

from rest_framework_nested import routers

from . import views


router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, 'category')
router.register('comics', views.ComicViewSet, 'comic')

# generates:
# Chapter List: comics/{slug}/chapters/
# Chapter Detail: comics/{slug}/chapters/{slug}
custom_chapter_router = routers.NestedSimpleRouter(router, r'comics', lookup='comic')
custom_chapter_router.register(r'chapters', views.ChapterViewSet, basename='chapters')

urlpatterns = [
    path('', include(router.urls)),
    path(r'', include(custom_chapter_router.urls)),
]
