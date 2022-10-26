from rest_framework.pagination import PageNumberPagination


class BasePagination(PageNumberPagination):
    page_size = 2

class CommentPagination(PageNumberPagination):
    page_size = 10

class ComicPagniation(PageNumberPagination):
    page_size = 10
