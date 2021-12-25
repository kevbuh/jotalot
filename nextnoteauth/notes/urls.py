from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListAllNotes.as_view(), name='ListAllNotes'),
    path('<int:pk>', views.SingleNote.as_view(), name='SingleNote'),
]
