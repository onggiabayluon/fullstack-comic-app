from django.contrib.auth.models import AbstractUser
from django.db import models
from autoslug import AutoSlugField
from django.utils.text import slugify


# Notes:
# null=false mean column need to have value in db
# blank=false mean column need to have value in form (admin or custom form)

# Cloudinary default location upload
def cloudinary_image_path(instance, filename):
    # Upload thumbnail to: /comics/{comic_slug}/thumbnail
    if isinstance(instance, Comic):
        comic = instance
        comic_slug = comic.slug
        return '/'.join(filter(None, ("comics", comic_slug, "thumbnail", filename)))
    # Upload thumbnail to: /users/{id}/thumbnail
    if isinstance(instance, User):
        user = instance
        user_id = user.id
        return '/'.join(filter(None, ("users", user_id, "thumbnail", filename)))
    # Upload images to: /comics/{comic_slug}/{chapter_slug}
    if isinstance(instance, ChapterImage):
        chapter_image = instance
        chapter = chapter_image.chapter
        chapter_slug = chapter.slug
        comic_slug = chapter.comic.slug
        return '/'.join(filter(None, ("comics", comic_slug, chapter_slug, filename)))


class User(AbstractUser):
    avatar = models.ImageField(upload_to=cloudinary_image_path, null=True, blank=True)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class MyModelBase(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.subject

    class Meta:
        abstract = True


class Comic(MyModelBase):

    class Meta:
        ordering = ["-id"]

    title = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True, blank=True)
    slug = AutoSlugField(unique=True, populate_from='title', editable=True, blank=True)
    thumbnail = models.ImageField(default='default.png', blank=True, upload_to=cloudinary_image_path)
    author = models.TextField(null=True, blank=True, default="None")
    # bookmark
    posted_by = models.ForeignKey(User, default=User, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField('Category', related_name="comics", blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Comic, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


def default_chapter_num():
    lastest_chapter = Chapter.objects.latest('id')
    next_lastest_chapter_num = lastest_chapter.chapter_num + 1
    return next_lastest_chapter_num


class Chapter(MyModelBase):
    class Meta:
        unique_together = ('chapter_num', 'comic')
        ordering = ["-id"]

    title = models.TextField(null=True, blank=True, default="None")
    chapter_num = models.PositiveIntegerField(null=False, default=default_chapter_num)
    slug = AutoSlugField(populate_from='chapter_num', editable=True, blank=True)
    comic = models.ForeignKey(Comic, related_name="chapters", on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        prefix = "chapter-"
        self.slug = prefix + str(self.chapter_num)
        super(Chapter, self).save(*args, **kwargs)

    def __str__(self):
        return "Ch.{0} of {1}".format(self.chapter_num, self.comic.title)


class ChapterImage(models.Model):
    thumbnail = models.ImageField(default='default.png', blank=True, upload_to=cloudinary_image_path)
    chapter = models.ForeignKey(Chapter, related_name="chapter_images", on_delete=models.CASCADE, null=True)


class ComicView(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    comic = models.OneToOneField(Comic, on_delete=models.CASCADE)


class Comment(models.Model):
    content = models.TextField()
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    reply_to = models.ForeignKey("self", null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Rating(models.Model):
    rate = models.PositiveSmallIntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
