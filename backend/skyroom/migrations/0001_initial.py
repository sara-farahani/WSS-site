# Generated by Django 4.2.8 on 2024-02-16 17:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("participant", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SkyroomRoom",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("room_id", models.IntegerField(unique=True)),
                ("name", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="SkyroomEvent",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True, max_length=5000)),
                ("starting_time", models.DateTimeField()),
                ("duration", models.DurationField()),
                ("tolerance", models.DurationField(default=600)),
                (
                    "plan",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="participant.participationplan",
                    ),
                ),
                (
                    "room",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="skyroom.skyroomroom",
                    ),
                ),
            ],
        ),
    ]
