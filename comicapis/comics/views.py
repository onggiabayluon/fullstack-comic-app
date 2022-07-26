from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Category, Chapter, Comic
from .paginators import BasePagination
from .serializers import CategorySerializer, ChapterSerializer, ComicDetailSerializer, ComicSerializer


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


"""
Comic List   : comics/
Comic Detail : comics/{slug}
"""


class ComicViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = ComicSerializer
    pagination_class = BasePagination
    lookup_field = "slug"

    def get_queryset(self):
        comics = Comic.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            comics = comics.filter(subject__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id is not None:
            comics = comics.filter(categories=cate_id)

        return comics

    def get_serializer_class(self):
        if self.action == 'list':
            return ComicSerializer
        if self.action == 'retrieve':
            return ComicDetailSerializer


"""
Chapter List   : comics/{slug}/chapters/
Chapter Detail : comics/{slug}/chapters/{slug}
"""


class ChapterViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = ChapterSerializer
    pagination_class = BasePagination
    lookup_field = "slug"

    def get_queryset(self):
        chapters = Chapter.objects.filter(active=True)

        return chapters
