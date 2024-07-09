from django.db import models

# Create your models here.
class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=25, blank=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
