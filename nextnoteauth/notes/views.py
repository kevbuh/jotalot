from rest_framework import status, filters, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from django.views import *

from .models import Note
from .serializers import NoteSerializer


class SearchResultsList(generics.ListCreateAPIView):
    filter_backends = (filters.SearchFilter,)
    search_fields = ['text', 'title']
    serializer_class = NoteSerializer
    # filterset_fields = ['creator']
    # queryset = Note.objects.all()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Note.objects.filter()
        user = self.request.user
        return Note.objects.filter(creator=user)


class ListAllNotes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.filter(creator=request.user).order_by('-id')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class SingleNote(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            note = Note.objects.filter(creator=request.user).get(pk=pk)
            serializer = NoteSerializer(note)
            return Response(serializer.data)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            note = Note.objects.filter(creator=request.user).get(pk=pk)
            serializer = NoteSerializer(note, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            note = Note.objects.filter(creator=request.user).get(pk=pk)
            note.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
