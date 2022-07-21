from django.contrib.auth.models import AbstractUser
from django.db import models
from autoslug import AutoSlugField
from django.utils.text import slugify


# Notes:
# null=false mean column need to have value in db
# blank=false mean column need to have value in form (admin or custom form)


class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/%Y/%m')


class Category(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)

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
    title = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True, blank=True)
    slug = AutoSlugField(unique=True, populate_from='title', editable=True, blank=True)
    thumbnail = models.ImageField(default='default.png', blank=True, upload_to='comics/%Y/%m')
    author = models.TextField(null=True, blank=True, default="None")
    # views
    # bookmark
    # rate

    posted_by = models.ForeignKey(User,
                                  on_delete=models.SET_NULL,
                                  null=True)
    category = models.ForeignKey(Category,
                                 on_delete=models.SET_NULL,
                                 null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Comic, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Chapter(MyModelBase):
    title = models.TextField(null=True, blank=True, default="None")
    chapter_num = models.PositiveIntegerField(null=False, unique=True)
    slug = AutoSlugField(unique=True, populate_from='chapter_num', editable=True, blank=True)
    # views
    comic = models.ForeignKey(Comic, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        prefix = "chapter-"
        self.slug = prefix + str(self.chapter_num)
        super(Comic, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Chapter_image(models.Model):
    thumbnail = models.ImageField(default='default.png', blank=True, upload_to='chapters/%Y/%m')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, null=True)


# class Comment(models.Model):
#     content = models.TextField()
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
#     creator = models.ForeignKey(User, on_delete=models.CASCADE)
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.content


# class Rating(ActionBase):
#     rate = models.PositiveSmallIntegerField(default=0)


# class LessonView(models.Model):
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)
#     views = models.IntegerField(default=0)
#     lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE)


# class Course(MyModelBase):
#     class Meta:
#         unique_together = ('subject', 'category')
#         ordering = ["-id"]

#     description = models.TextField(null=True, blank=True)
#     category = models.ForeignKey(Category,
#                                  on_delete=models.SET_NULL,
#                                  null=True)


# class Lesson(MyModelBase):
#     class Meta:
#         unique_together = ('subject', 'course')

#     content = models.TextField()
#     course = models.ForeignKey(Course,
#                                related_name="lessons",
#                                on_delete=models.CASCADE)

#     tags = models.ManyToManyField('Tag', related_name="lessons", blank=True, null=True)


# class Comment(models.Model):
#     content = models.TextField()
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
#     creator = models.ForeignKey(User, on_delete=models.CASCADE)
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.content


# class Tag(models.Model):
#     name = models.CharField(max_length=50, unique=True)


# class ActionBase(models.Model):
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
#     creator = models.ForeignKey(User, on_delete=models.CASCADE)

#     class Meta:
#         abstract = True
#         unique_together = ("lesson", "creator")


# class Action(ActionBase):
#     LIKE, HAHA, HEART = range(3)
#     ACTIONS = [
#         (LIKE, 'like'),
#         (HAHA, 'haha'),
#         (HEART, 'heart')
#     ]
#     type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


# class Rating(ActionBase):
#     rate = models.PositiveSmallIntegerField(default=0)


# class LessonView(models.Model):
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)
#     views = models.IntegerField(default=0)
#     lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE)
