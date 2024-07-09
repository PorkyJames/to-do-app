from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from todo.serializers import TaskSerializer
from .models import Task

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. This is my first Django View.")

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

