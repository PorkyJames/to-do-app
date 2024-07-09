from rest_framework import serializers
from models import Task

# Specifies the model to work with and the fields to be converted to JSON
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'created_at')

