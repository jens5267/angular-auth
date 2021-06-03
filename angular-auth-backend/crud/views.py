import json

from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status

from .serializers import PersonSerizalizer
from .models import Person


@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_persons(request):
    """ 
    Endpoint for getting all persons data
    """
    # fetch all persons
    persons = Person.objects.all()
    # serialize it
    serializer = PersonSerizalizer(persons, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)


@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_person(request, person_id):
    """
    Endpoint for getting person data by id
    """
    # Get person by id
    person = Person.objects.filter(id=person_id)
    # Check for 404
    if len(person) == 0:
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PersonSerizalizer(person, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)


@api_view(["POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def add_person(request):
    """ 
    Endpoint for adding new person
    """
    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Bad request'},
                        status=status.HTTP_400_BAD_REQUEST)
    serializer = PersonSerizalizer(data=request.data)
    serializer.is_valid(raise_exception=True)
    check = Person.objects.filter(first_name=payload['first_name'])
    if check:
        return Response({'error': 'This person already exist!'})
    person = Person.objects.create(
        first_name=payload["first_name"],
        last_name=payload["last_name"],
        age=payload["age"]
    )
    serializer = PersonSerizalizer(person)
    return Response(serializer.data,  status=status.HTTP_201_CREATED)


@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def update_person(request, person_id):
    """
    Endpoint for updating person data by person_id
    """
    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Bad request'},
                        status=status.HTTP_400_BAD_REQUEST)
    person_req = Person.objects.filter(id=person_id)
    person_req.update(**payload)
    person = Person.objects.get(id=person_id)
    serializer = PersonSerizalizer(person)
    return Response({'person': serializer.data, 'updated': True},
                    status=status.HTTP_200_OK)


@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_person(request, person_id):
    """
    Endpoint for deleting person data by person_id
    """
    try:
        data = Person.objects.get(id=person_id)
        data.delete()
        return Response({'deleted': True}, status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist as e:
        return Response({'error': str(e)},  status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({'error': 'Something went wrong'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
