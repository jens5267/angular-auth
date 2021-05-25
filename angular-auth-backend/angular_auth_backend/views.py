from django.http import JsonResponse


def HomePage(request):
    return JsonResponse({'message': 'Hi bro 😎'})
