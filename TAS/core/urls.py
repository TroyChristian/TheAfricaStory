from django.urls import path
#core
from . import views

urlpatterns = [

path("", views.index, name="index"),
path('success', views.success, name='success'),
path('success/<str:file_type>', views.success, name='success'),
path('unset-session-variable', views.unset_session_variable, name="unset_session_variable"),
path('download-ebook', views.download_ebook, name='download_ebook'),





]