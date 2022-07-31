from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Category, Chapter, Comic, ComicView, Comment, Rating, User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserLessSerializer(ModelSerializer):
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
        return UserLessSerializer(comic.posted_by, context={"request": self.context.get('request')}).data

    class Meta:
        model = ComicSerializer.Meta.model
        # fields = "__all__"
        fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by"]


class ChapterSerializer(ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"


class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "rate", "created_date"]


class CommentSerializer(ModelSerializer):
    creator = SerializerMethodField()

    def get_creator(self, comment):
        return UserLessSerializer(comment.creator, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'creator', 'reply_to']



class ComicViewSerializer(ModelSerializer):
    class Meta:
        model = ComicView
        fields = ["id", "views", "comic"]


class UserSerializer(ModelSerializer):
    # overriding create
    def create(self, validated_data):
        # Hashing password whenever creating new user
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "avatar",
                  "username", "password", "email", "date_joined"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }
