from django.urls import path, include
from . import views
from .views import *


urlpatterns = [
    path('leads/', LeadList.as_view()),
    path('leads/image/<path:image>', ImageServeView.as_view(), name='image_serve')
]