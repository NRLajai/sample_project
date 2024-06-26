# Generated by Django 5.0.1 on 2024-01-04 07:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_flow', '0008_alter_lead_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='phone_number',
            field=models.CharField(max_length=10, validators=[django.core.validators.MinLengthValidator(limit_value=10, message='Phone number must be 10 digits')]),
        ),
    ]
