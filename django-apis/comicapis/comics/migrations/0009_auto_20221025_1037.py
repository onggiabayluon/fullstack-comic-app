# Generated by Django 3.2.5 on 2022-10-25 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0008_alter_product_stripe_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='stripe_id',
            new_name='stripe_product_id',
        ),
        migrations.AddField(
            model_name='product',
            name='stripe_price_id',
            field=models.CharField(editable=False, max_length=50, null=True),
        ),
    ]
