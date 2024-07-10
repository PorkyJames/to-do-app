from django.db import models

# Create your models here.
# No need to put an Id or even a created_at as Django automatically increments them for us. 
class Task(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
