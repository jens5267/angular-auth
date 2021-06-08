from rest_framework.validators import ValidationError

from django.contrib.auth.models import User

def unique_email(value):
    if User.objects.filter(email=value).exists():
        raise ValidationError(detail='User with this email already exist!')