# Generated by Django 3.2.5 on 2022-10-25 01:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0005_auto_20221025_0839'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]