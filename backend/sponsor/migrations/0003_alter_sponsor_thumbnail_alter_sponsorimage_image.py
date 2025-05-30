# Generated by Django 4.2.8 on 2025-03-18 20:59

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sponsor', '0002_alter_sponsor_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sponsor',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to=core.models.UniqueUploadPath('sponsors')),
        ),
        migrations.AlterField(
            model_name='sponsorimage',
            name='image',
            field=models.ImageField(upload_to=core.models.UniqueUploadPath('sponsors')),
        ),
    ]
