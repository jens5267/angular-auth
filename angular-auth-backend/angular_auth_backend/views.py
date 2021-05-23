from django.http import JsonResponse

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from authentication.models import Person
from .serizalizers import PersonSerizalizer


class ListPersons(generics.ListAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerizalizer
    permission_classes = (IsAuthenticated,)

def HomePage(request):
    return JsonResponse({'message':'Hi bro!'})