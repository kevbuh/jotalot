from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.django_models_json, name='django_models_json'),
]
