from rest_framework import serializers

from .models import Person


class PersonSerizalizer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    age = serializers.IntegerField()  
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'age']
