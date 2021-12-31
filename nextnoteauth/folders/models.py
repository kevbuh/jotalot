from django.db import models

# Create your models here.
from core.settings import AUTH_USER_MODEL


class Folder(models.Model):
    folder_creator = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE)
    folder_name = models.CharField(max_length=200)
    modified_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.folder_name
