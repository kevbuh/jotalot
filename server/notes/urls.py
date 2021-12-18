from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.GetNoteList, name='GetNoteList'),
    path('<int:pk>', views.GetSingleNote, name='GetSingleNote'),
]
