from .models import Note
from django.core.serializers import serialize
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.


def index(request):
    return HttpResponse("Hello, world!")


# views.py
# def django_models_json(request):
#     obj = Note.objects.first()
#     data = serialize("json", [obj], fields=('note_title', 'note_text'))
#     return HttpResponse(data, content_type="application/json")

# def django_models_json(request):
#     data = [{'name': 'Peter', 'email': 'peter@example.org'},
#             {'name': 'Julia', 'email': 'julia@example.org'}]

#     return JsonResponse(data, safe=False)

def django_models_json(request):
    data = list(Note.objects.values())
    return JsonResponse(data, safe=False)
