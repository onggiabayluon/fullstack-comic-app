# Generated by Django 3.2.5 on 2022-10-25 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0006_auto_20221025_0842'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='stripe_id',
            field=models.CharField(max_length=50, null=True),
        ),
    ]