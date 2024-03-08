
#Core Django
from django.contrib import admin

#this app
from .models import Message

# Register your models here.
class MessageAdmin(admin.ModelAdmin):
	list_display = ('sender_email', 'sender_name', 'content', 'is_read') 

 



admin.site.register(Message, MessageAdmin)

