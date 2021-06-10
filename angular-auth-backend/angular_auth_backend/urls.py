from django.urls import path
from django.urls import include
from django.contrib import admin

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import HomePage
from authentication.views import CreateUserView
from crud.views import *


urlpatterns = [
    path('', HomePage),
    path('admin/', admin.site.urls),
    path('api/auth/register', CreateUserView.as_view()),
    path('api/auth/login', TokenObtainPairView.as_view()),
    path('api/auth/refresh', TokenRefreshView.as_view()),
    path('api/people', PersonsView.as_view()),
    path('api/person/add', PersonAddView.as_view()),
    path('api/person/<int:pk>/update', PersonUpdateView.as_view()),
    path('api/person/<int:pk>/delete', PersonDeleteView.as_view())
]
