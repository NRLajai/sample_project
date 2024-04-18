from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from . import models


@admin.register(models.Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', "tag", "status", 'phone_number', "company_details"]



