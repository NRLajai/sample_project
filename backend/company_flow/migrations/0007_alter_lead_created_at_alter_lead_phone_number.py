# Generated by Django 5.0.1 on 2024-01-04 07:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_flow', '0006_alter_lead_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='lead',
            name='phone_number',
            field=models.IntegerField(max_length=10, validators=[django.core.validators.MinLengthValidator(limit_value=10, message='Phone number must be 10 digits')]),
        ),
    ]