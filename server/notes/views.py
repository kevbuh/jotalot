from django.core import serializers
from .models import Note
from django.core.serializers import serialize
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import NoteSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def index(request):
    return HttpResponse("Hello, world!")


@csrf_exempt
def GetNoteList(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def GetSingleNote(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = NoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        note.delete()
        return HttpResponse(status=204)

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
