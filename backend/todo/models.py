from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=25, required=True)
    description = models.CharField(max_length=255, required=False)
    completed = models.BooleanField()
    created_at = models.DateField()
