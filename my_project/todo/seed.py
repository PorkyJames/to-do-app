import os
import django
import sys

from datetime import datetime

# Add the project root directory to the Python path
# Had to add an extra pathway to find my todo folder / seed properly. Otherwise, I get a backend module not found error
sys.path.append('/home/kwanj/projects/To-Do/my_project') 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

django.setup()

from todo.models import Task

# List of tasks to add to our card
tasks = [
    {"title": "Grocery Shopping", "description": "Buy milk, eggs, and bread", "completed": False, "created_at": datetime(2024,7,8)},
    {"title": "Read Book", "description": "Read 'Django for APIs' by William S. Vincent", "completed": False, "created_at": datetime(2024,7,5)},
    {"title": "Jogging", "description": "Jog around the park for 30 minutes.", "completed": True, "created_at": datetime(2024,7,7)},
]

for task in tasks:
    Task.objects.create(**task)
    #** is the unpack feature which will unpack our task variable listed above for us.

print("Data Seeded Successfully")
