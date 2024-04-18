from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Lead
from .serializers import LeadSerializer


from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings
import os


class ImageServeView(APIView):
    def get(self, request, *args, **kwargs):
        image_path = os.path.join(settings.MEDIA_ROOT, 'images', kwargs['image'])

        if not os.path.exists(image_path):
            return Response({'error': "Image not found."}, status=status.HTTP_403_FORBIDDEN)
        
        with open(image_path, 'rb') as image_file:
            response = HttpResponse(image_file.read(), content_type='image/jpeg')
        return response
    

class LeadList(ListCreateAPIView):
    http_method_names = ["get", "post"]
    
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields =  ["name", "company_details"]
    ordering_fields = ["name", "company_details", "follow_up_date"]

    def get_serializer_context(self):
        return {"request": self.request}
