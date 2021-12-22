from django.urls import path

from . import views

urlpatterns = [
    path('', views.GetNoteList, name='GetNoteList'),
    path('<int:pk>', views.GetSingleNote, name='GetSingleNote'),
]
