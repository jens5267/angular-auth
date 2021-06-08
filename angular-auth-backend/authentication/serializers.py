from django.contrib.auth.models import User

from rest_framework import serializers

from .validators import unique_email

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[unique_email])
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
