
from django.contrib import admin
from django.urls import re_path, include

urlpatterns = [
    re_path('auth/', include('rest_auth.urls')),
]
