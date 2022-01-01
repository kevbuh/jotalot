from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListAllNotes.as_view(), name='ListAllNotes'),
    path('<int:pk>', views.SingleNote.as_view(), name='SingleNote'),
    # path('search/<int:pk>', views.SingleNote.as_view(), name='SingleNote'),
    path("search/", views.SearchResultsList.as_view(), name="search_results"),
    path("folder/<int:pk>", views.NotesInFolder.as_view(), name="NotesInFolder"),
]
