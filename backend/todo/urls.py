from django.urls import path, include
from django.contrib import admin

from . import views

urlpatterns =[
    # Seems like we import a path function then give it a route. THen we import from the views the 
    # index function and give it a name of 'index'
    path("", views.index, name='index')
]
