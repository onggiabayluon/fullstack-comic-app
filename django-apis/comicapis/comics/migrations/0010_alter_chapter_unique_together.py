# Generated by Django 3.2.5 on 2022-08-04 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0009_auto_20220804_1539'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='chapter',
            unique_together={('id', 'chapter_num')},
        ),
    ]
