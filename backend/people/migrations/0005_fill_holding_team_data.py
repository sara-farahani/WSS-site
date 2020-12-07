# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    WSS = apps.get_model('WSS', 'WSS')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')

    teams_staff = {
        'Content': ['Mehdi Farvardin', 'Hossein Firooz', 'Sepehr Amini Afshar', 'Farzam Zohdinasab', 'Pooya Moeini', 'Seyed Mohammad mehdi Hatami'],
        'Technical': ['Emran Batmanghelich', 'Ahmad Salimi', 'Ali asghar Ghanati', 'Fateme Khashei', 'Alireza Tajmir riahi', 'Mohammad mehdi Barghi', 'Seyed Alireza Hashemi', 'ArhsiA Akhavan'],
        'Network': ['Amirhossein Hadian', 'Amirmohammad Imani', 'Sajjad Rezvani', 'Shima Ramadani', 'Mehdi Jalali', 'Sara Azarnoosh', 'Ehsan Movafagh', 'Fatemeh Asgari'],
        'Branding': ['Seyed Alireza Hosseini'],
        'Social': ['Sara Azarnoosh', 'Dorna Dehghani', 'Ghazal Shenavar', 'Helia Akhtarkavian', 'Sabiheh Tajdari', 'Sahel Messforoosh', 'Esmaeil Pahang'],
        'Media': ['Hamila Meili', 'Mahdieh Ebrahimpoor', 'Roya Aghvami', 'Sara Zahedi', 'Hossein Aghamohammadi'],
        'Presentation Management': ['Alireza Ziaei', 'Amirhossein Asem Yousefi', 'Vahid Zehtab', 'Sajjad Rezvani'],
    }

    wss = WSS.objects.get(year=2020)

    for team_name in teams_staff:
        team = HoldingTeam.objects.create(wss=wss, name=team_name)
        team.staff.set(Staff.objects.filter(name__in=teams_staff[team_name]))


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')

    wss = WSS.objects.get(year=2020)

    team_names = ['Content', 'Technical', 'Network', 'Branding', 'Social', 'Media', 'Presentation Management']
    HoldingTeam.objects.filter(wss=wss, name__in=team_names).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0004_fill_staff_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
