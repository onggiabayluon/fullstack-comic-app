# Generated by Django 3.2.5 on 2022-10-26 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0011_product_stripe_price_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='coin',
        ),
        migrations.AddField(
            model_name='user',
            name='coins',
            field=models.IntegerField(default=0),
        ),
    ]