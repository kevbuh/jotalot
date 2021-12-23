from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated

from .models import Note
from .serializers import NoteSerializer

# Create your views here.
from rest_framework.views import APIView


class ListAllNotes(APIView):
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


# @api_view(['GET', 'POST'])
# @login_required
# @permission_classes([IsAuthenticated])
# def GetNoteList(request):
#     if request.method == 'GET':
#         notes = Note.objects.filter(creator=request.user).order_by('-id')
#         serializer = NoteSerializer(notes, many=True)
#         return Response(serializer.data)

#     if request.method == 'POST':
        # serializer = NoteSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save(creator=request.user)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


# @api_view(['GET', 'PUT', 'DELETE'])
# # @login_required
# # @permission_classes([IsAuthenticated])
# def GetSingleNote(request, pk):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         note = Note.objects.filter(creator=request.user).get(pk=pk)
#     except Note.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = NoteSerializer(note)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = NoteSerializer(note, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

#     elif request.method == 'DELETE':
#         note.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class SingleNote(APIView):
    def get(self, request, pk):
        try:
            note = Note.objects.filter(creator=request.user).get(pk=pk)
            serializer = NoteSerializer(note)
            return Response(serializer.data)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        note = Note.objects.filter(creator=request.user).get(pk=pk)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        note = Note.objects.filter(creator=request.user).get(pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
