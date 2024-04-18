from rest_framework.exceptions import ValidationError
from rest_framework import serializers
import hashlib
import os
from aagnia_backend import settings

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "name", "company_details", "tag", "status", "follow_up_date", "phone_number", "image"]
    
    def validate_image(self, value):
        try:
            image_url = "company/leads/image/"
            request = self.context.get('request')

            image_name = value.name
            image_size = value.size
            image_content_type = value.content_type
            
            max_size_bytes = 1 * 1024 * 1024  # 1MB
            if image_size > max_size_bytes:
                raise ValidationError("Image size exceeds the limit of 1MB")
            
            allowed_content_types = ['image/jpeg', 'image/png']
            if image_content_type not in allowed_content_types:
                raise ValidationError("Invalid image MIME type. Allowed types: JPEG and PNG")
            
            if request:
                image_format = image_content_type.split('/')[-1]
                image_name = hashlib.md5(value.name.encode()).hexdigest() +"."+ image_format
                save_path = os.path.join(settings.MEDIA_ROOT, 'images', image_name)
                with open(save_path, 'wb') as f:
                    for chunk in value.chunks():
                        f.write(chunk)
            else:
                raise ValidationError("Request object not available in context")    
            
            return f"{image_url}{image_name}"
        
        except Exception as err:
            raise ValidationError(err)