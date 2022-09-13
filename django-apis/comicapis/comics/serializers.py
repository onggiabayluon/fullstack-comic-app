from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (Category, Chapter, ChapterImage, Comic, ComicView,
                     Comment, Rating, User)


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
        # ...
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
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserLessSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


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


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ComicSerializer(ModelSerializer):
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


class ComicDetailTypeLessSerializer(ComicSerializer):
    chapters = SerializerMethodField()

    def get_chapters(self, comic):
        # Get 3 lastest update chapter
        chapters = comic.chapters.order_by('-updated_date')[:3]
        return ChapterLessSerializer(chapters, many=True, context={"request": self.context.get('request')}).data

    class Meta:
        model = ComicSerializer.Meta.model
        # fields = "__all__"
        fields = ComicSerializer.Meta.fields + ["description", "author", "posted_by"]


class ChapterLessSerializer(ModelSerializer):

    class Meta:
        model = Chapter
        fields = ["chapter_num", "slug"]


class ChapterSerializer(ModelSerializer):
    images = SerializerMethodField()

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
