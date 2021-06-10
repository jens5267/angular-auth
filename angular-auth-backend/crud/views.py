from rest_framework.views import APIView

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import serializers
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status

from .serializers import PersonSerizalizer
from .models import Person


class PersonsView(ListAPIView):
    queryset = Person.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerizalizer


class PersonAddView(CreateAPIView):
    queryset = Person.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerizalizer


class PersonUpdateView(UpdateAPIView):
    queryset = Person.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerizalizer


class PersonDeleteView(DestroyAPIView):
    queryset = Person.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerizalizer
