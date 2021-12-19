from django.core import serializers
from .models import Note
from django.core.serializers import serialize
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import NoteSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


def index(request):
    return HttpResponse("Hello, world!")


@api_view(['GET', 'POST'])
def GetNoteList(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def GetSingleNote(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# def django_models_json(request):
#     if request.method == "POST":
#         return

#     else:
#         data = list(Note.objects.values())
#         return JsonResponse(data, safe=False)


# views.py
# def django_models_json(request):
#     obj = Note.objects.first()
#     data = serialize("json", [obj], fields=('note_title', 'note_text'))
#     return HttpResponse(data, content_type="application/json")

# def django_models_json(request):
#     data = [{'name': 'Peter', 'email': 'peter@example.org'},
#             {'name': 'Julia', 'email': 'julia@example.org'}]

#     return JsonResponse(data, safe=False)
