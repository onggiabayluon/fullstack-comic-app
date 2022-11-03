from datetime import datetime

from django.contrib.auth.password_validation import validate_password
from django.db.models.fields.files import ImageFieldFile
from rest_framework import serializers
from rest_framework.serializers import (FileField, ModelSerializer,
                                        SerializerMethodField)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (Bookmark, Category, Chapter, ChapterImage, ChapterView,
                     Comic, Comment, Product, Rating, User)


def encode_imagefield(obj):
    """
    Extended encoder function that helps to serialize dates and images
    """
    # if isinstance(obj, datetime.date):
    #     try:
    #         return obj.strftime('%Y-%m-%d')
    #     except ValueError:
    #         return ''

    if isinstance(obj, ImageFieldFile):
        try:
            return obj.path
        except ValueError:
            return ''

    raise TypeError(repr(obj) + " is not JSON serializable")

# Authentication serializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # create a token (more specifically access & refresh tokens)
    # if valid username & password are provided.

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['avatar'] = encode_imagefield(user.avatar)
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


# Custom serializer
class UserLessSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class UserSerializer(ModelSerializer):
    avatar = FileField()

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
                  "username", "password", "email", "date_joined", "coins"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }


class UserBookmarkSerializer(UserLessSerializer):
    bookmarks = SerializerMethodField()

    def get_bookmarks(self, user):
        return BookmarkDetailSerializer(user.bookmark_set, many=True, context={"request": self.context.get('request')}).data

    class Meta:
        model = UserLessSerializer.Meta.model
        # fields = "__all__"
        fields = UserLessSerializer.Meta.fields + ["bookmarks"]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CoinSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CategoryDetailSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class ChapterViewSerializer(ModelSerializer):
    class Meta:
        model = ChapterView
        fields = "__all__"


class ComicLessSerializer(ModelSerializer):

    class Meta:
        model = Comic
        fields = ["id", "title", "slug", "created_date", "updated_date", "active", "thumbnail"]


class ComicSerializer(ComicLessSerializer):
    # thumbnail = SerializerMethodField()

    # def get_thumbnail(self, comic):
    #     request = self.context['request']
    #     name = comic.thumbnail.name
    #     if name.startswith("static/"):
    #         path = '/%s' % name
    #     else:
    #         path = '/static/%s' % name

    #     return request.build_absolute_uri(path)

    class Meta:
        model = ComicLessSerializer.Meta.model
        fields = ComicLessSerializer.Meta.fields + ["chapters"]


class ComicDetailSerializer(ComicSerializer):
    posted_by = SerializerMethodField()
    categories = SerializerMethodField()
    chapters = SerializerMethodField()
    rating = SerializerMethodField()
    bookmark_count = serializers.IntegerField(source='bookmark_set.count', read_only=True)

    def get_chapters(self, comic):
        chapters = comic.chapters.order_by('-chapter_num')
        return ChapterLessSerializer(chapters, many=True, context={"request": self.context.get('request')}).data

    def get_posted_by(self, comic):
        return UserLessSerializer(comic.posted_by, context={"request": self.context.get('request')}).data

    def get_categories(self, comic):
        return CategorySerializer(comic.categories, many=True, context={"request": self.context.get('request')}).data

    def get_rating(self, comic):
        return RatingSerializer(comic.rating_set, many=True, context={"request": self.context.get('request')}).data

    class Meta:
        model = ComicSerializer.Meta.model
        # fields = "__all__"
        fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by", "categories", "rating", "bookmark_count"]


class ComicDetailTypeLessSerializer(ComicSerializer):
    chapters = SerializerMethodField()
    categories = SerializerMethodField()

    def get_chapters(self, comic):
        # Get 3 lastest update chapter
        chapters = comic.chapters.order_by('-updated_date')[:3]
        return ChapterLessSerializer(chapters, many=True, context={"request": self.context.get('request')}).data

    def get_categories(self, comic):
        return CategorySerializer(comic.categories, many=True, context={"request": self.context.get('request')}).data

    class Meta:
        model = ComicSerializer.Meta.model
        # fields = "__all__"
        fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by", "categories"]


# class ComicDetailTypeDetailSerializer(ComicSerializer):
#     chapters = SerializerMethodField()

#     def get_chapters(self, comic):
#         # Get 3 lastest update chapter
#         chapters = comic.chapters.order_by('-updated_date')
#         return ChapterLessSerializer(chapters, many=True, context={"request": self.context.get('request')}).data

#     class Meta:
#         model = ComicSerializer.Meta.model
#         # fields = "__all__"
#         fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by"]


class ChapterLessSerializer(ModelSerializer):
    views = serializers.IntegerField(source="chapterview.views")

    class Meta:
        model = Chapter
        fields = ["chapter_num", "slug", "updated_date", "views", "price"]


class ChapterSerializer(ModelSerializer):
    images = SerializerMethodField()
    comic_title = serializers.CharField(source="comic.title")
    comic_slug = serializers.CharField(source="comic.slug")
    views = serializers.IntegerField(source="chapterview.views")

    def get_images(self, chapter):
        # Get 3 lastest update chapter
        images = chapter.chapter_images
        return ChapterImageSerializer(images, many=True, context={"request": self.context.get('request')}).data

    class Meta:
        model = Chapter
        fields = "__all__"


class ChapterImageSerializer(ModelSerializer):

    class Meta:
        model = ChapterImage
        fields = "__all__"


class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "rate", "created_date", "creator"]


class CommentSerializer(ModelSerializer):
    creator = SerializerMethodField()
    # reply_set = SerializerMethodField()

    def get_creator(self, comment):
        return UserLessSerializer(comment.creator, context={"request": self.context.get('request')}).data
    # def get_reply_set(self, comment):
    #     reply = comment.__class__.objects.filter(reply_to=comment.id)
    #     return ReplySerializer(reply, many=True).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'creator', 'reply_to']


class ReplySerializer(CommentSerializer):
    class Meta:
        model = CommentSerializer.Meta.model
        fields = CommentSerializer.Meta.fields


class BookmarkSerializer(ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ["id", "created_date", "updated_date", "creator"]


class BookmarkDetailSerializer(BookmarkSerializer):
    comic = SerializerMethodField()

    def get_comic(self, bookmark):
        return ComicLessSerializer(bookmark.comic, context={"request": self.context.get('request')}).data

    class Meta:
        model = BookmarkSerializer.Meta.model
        fields = BookmarkSerializer.Meta.fields + ["comic"]


class UploadSerializer(ModelSerializer):
    file_uploaded = FileField()

    class Meta:
        fields = ['file_uploaded']
