from django.contrib import admin
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.db import models


class Lead(models.Model):
    STATUS_NEW = 'N'
    STATUS_HOT = 'H'
    STATUS_WON = 'W'
    STATUS_LOST = 'L'

    STATUS_CHOICES = [
        (STATUS_NEW, 'New'),
        (STATUS_HOT, 'Hot'),
        (STATUS_WON, 'Won'),
        (STATUS_LOST, 'Lost'),
    ]

    created_at = models.DateField(auto_now_add=True)
    company_details = models.TextField(max_length=255, null=False)
    tag = models.CharField(max_length=50)
    
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, default=STATUS_NEW)
    follow_up_date = models.DateField(null=False, blank=False)
    phone_number = models.CharField(
        max_length=10,
        validators=[MinLengthValidator(limit_value=10, message='Phone number must be 10 digits')]
    )
    name = models.CharField(max_length=50, null=False)
    image = models.ImageField(upload_to='images/', null=False)
    
    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']
