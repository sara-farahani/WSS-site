# Generated by Django 3.1.2 on 2020-11-12 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technicalexpert',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='technical_experts', to='people.role'),
        ),
    ]
