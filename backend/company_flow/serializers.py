from rest_framework.exceptions import ValidationError
from rest_framework import serializers
import hashlib
import os
from aagnia_backend import settings
import base64
from rest_framework import response

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "name", "company_details", "tag", "status", "follow_up_date", "phone_number", "image", "address", "created_at"]
    
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

                if os.path.exists(save_path):
                    os.remove(save_path)

                try:
                    with open(save_path, 'wb') as f:
                        for chunk in value.chunks():
                            f.write(chunk)
                except:
                    with open(value.temporary_file_path(), 'rb') as f:
                        encoded_image = base64.b64encode(f.read()).decode('utf-8')
                                                                        
                    with open(save_path, 'wb') as f:
                        f.write(encoded_image)
            else:
                raise ValidationError("Request object not available in context")
            
            return f"{image_url}{image_name}"
        
        except Exception as err:
            raise ValidationError(err)
        
    
    def validate_status(self, value):
        if value == "L":
            return "Lost"
        elif value == "N":
            return "New"
        elif value == "W":
            return "Won"
        elif value == "H":
            return "Hot"
        