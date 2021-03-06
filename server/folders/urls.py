from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListAllFolders.as_view(), name='ListAllFolders'),
    path('<int:pk>', views.SingleFolder.as_view(), name='SingleFolder'),
    # path('<int:pk>/notes', views.NotesInFolder.as_view(), name='NotesInFolder'),
]
