# Generated by Django 4.0.5 on 2022-06-08 13:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0005_rename_city_listing_cities'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='cities',
            new_name='city',
        ),
    ]