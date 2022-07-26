from rest_framework.pagination import PageNumberPagination


class BasePagination(PageNumberPagination):
    page_size = 20
