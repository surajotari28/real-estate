# Generated by Django 4.0.5 on 2022-06-08 13:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0004_alter_listing_city'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='city',
            new_name='cities',
        ),
    ]
