from django.contrib import admin
from .models import Category, Comic, Chapter

# Register your models here.
admin.site.register(Category)
admin.site.register(Comic)
admin.site.register(Chapter)
