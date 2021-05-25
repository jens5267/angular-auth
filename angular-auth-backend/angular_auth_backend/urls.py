"""angular_auth_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.urls import include
from django.contrib import admin

from .views import HomePage
from crud.views import *

urlpatterns = [
    path('', HomePage),
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/persons', get_persons),
    path('api/persons/<int:person_id>', get_person),
    path('api/persons/add', add_person),
    path('api/persons/<int:person_id>/update', update_person),
    path('api/persons/<int:person_id>/delete', delete_person),
]
