from django.db import models
# from user.models import User
# Create your models here.
from core.settings import AUTH_USER_MODEL


class Note(models.Model):
    creator = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
