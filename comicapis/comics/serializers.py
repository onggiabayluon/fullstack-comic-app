from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Category, Chapter, Comic, User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class PostedBySerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ComicSerializer(ModelSerializer):
    thumbnail = SerializerMethodField()

    def get_thumbnail(self, comic):
        request = self.context['request']
        name = comic.thumbnail.name
        if name.startswith("static/"):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)

    class Meta:
        model = Comic
        fields = ["id", "title", "slug", "created_date", "updated_date", "active", "thumbnail", "categories", "chapters"]


class ComicDetailSerializer(ComicSerializer):
    posted_by = SerializerMethodField()

    def get_posted_by(self, comic):
        return PostedBySerializer(comic.posted_by, context={"request": self.context.get('request')}).data

    class Meta:
        model = ComicSerializer.Meta.model
        # fields = "__all__"
        fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by"]


class ChapterSerializer(ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"
