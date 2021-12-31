from django.db import models
from core.settings import AUTH_USER_MODEL
from folders.models import Folder


class Note(models.Model):
    creator = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE)
    folder = models.ForeignKey(
        Folder, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
