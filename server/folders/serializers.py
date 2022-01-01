# from django.db import models
from rest_framework import serializers
from .models import Folder
from notes.serializers import NoteSerializer


class FolderSerializer(serializers.ModelSerializer):
    # notes = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='title'
    # )

    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Folder
        fields = ['id', 'folder_name', 'notes']
