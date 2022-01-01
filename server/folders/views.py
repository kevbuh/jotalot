from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from django.views import *

from .models import Folder
from .serializers import FolderSerializer


# class NotesInFolder(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, pk):
#         try:
#             folder = Folder.objects.filter(
#                 folder_creator=request.user).get(pk=pk)
#             serializer = FolderSerializer(folder)
#             return Response(serializer.data)
#         except Folder.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         try:
#             folder = Folder.objects.filter(
#                 folder_creator=request.user).get(pk=pk)
#             serializer = FolderSerializer(folder, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
#         except Folder.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             folder = Folder.objects.filter(
#                 folder_creator=request.user).get(pk=pk)
#             folder.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Folder.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)


class ListAllFolders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        folders = Folder.objects.filter(
            folder_creator=request.user).order_by('-id')
        serializer = FolderSerializer(folders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(folder_creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class SingleFolder(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            folder = Folder.objects.filter(
                folder_creator=request.user).get(pk=pk)
            serializer = FolderSerializer(folder)
            return Response(serializer.data)
        except Folder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            folder = Folder.objects.filter(
                folder_creator=request.user).get(pk=pk)
            serializer = FolderSerializer(folder, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Folder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            folder = Folder.objects.filter(
                folder_creator=request.user).get(pk=pk)
            folder.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Folder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
