from django.urls import path
#core
from . import views

urlpatterns = [

path("", views.index, name="index"),



]