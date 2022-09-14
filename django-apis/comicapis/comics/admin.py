import nested_admin
from django.contrib import admin

from .models import Category, Chapter, ChapterImage, Comic, User

# Inline Classes


class ChapterImageInline(nested_admin.NestedStackedInline):
    model = ChapterImage
    extra = 0
    max_num = 0


class ChapterInline(nested_admin.NestedStackedInline):
    model = Chapter
    extra = 1
    max_num = 1
    readonly_fields = ('slug',)
    inlines = [ChapterImageInline]


# Main Classes


class ComicAdmin(nested_admin.NestedModelAdmin):
    inlines = [ChapterInline]
    list_display = ["title", "slug", "id", "created_date", "updated_date"]
    search_fields = ["comic"]
    list_filter = ('created_date',)
    readonly_fields = ('slug',)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        for instance in instances:
            instance.save()
            # Take instace Chapter and add image to ChapterImage Model
            if isinstance(instance, Chapter):

                for afile in request.FILES.getlist('photos_multiple'):
                    instance.chapter_images.create(thumbnail=afile)
        formset.save_m2m()


class ChapterAdmin(admin.ModelAdmin):
    inlines = [ChapterImageInline]
    list_display = ["slug", "id", "get_comic_title", "get_comic_slug", "created_date"]
    search_fields = ["comic__title"]
    list_filter = ('created_date', 'chapter_num',)
    readonly_fields = ('slug',)

    def get_comic_title(self, obj):
        return obj.comic
    get_comic_title.short_description = 'comic'
    get_comic_title.admin_order_field = 'chapter__comic'

    def get_comic_slug(self, obj):
        return obj.comic.slug
    get_comic_slug.short_description = 'ComicSlug'

    def save_model(self, request, obj, form, change):
        obj.save()

        for afile in request.FILES.getlist('photos_multiple'):
            obj.chapter_images.create(thumbnail=afile)


class ChapterImageAdmin(admin.ModelAdmin):
    list_display = ["chapter", "thumbnail"]
    list_filter = ('chapter__id', )
    search_fields = ["chapter__id"]

    def get_chapter(self, obj):
        return obj.chapter.id
    get_chapter.short_description = 'chapter id'
    get_chapter.admin_order_field = 'image__chapter'


# Register your models here.
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Comic, ComicAdmin)
admin.site.register(ChapterImage, ChapterImageAdmin)
admin.site.register(Chapter, ChapterAdmin)
