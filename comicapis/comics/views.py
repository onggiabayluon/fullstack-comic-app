from rest_framework import viewsets, generics

from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
