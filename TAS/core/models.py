from django.db import models

# Create your models here.


class Message(models.Model):
	sender_email = models.EmailField(max_length=128)
	sender_name = models.CharField(max_length=128) 
	content = models.TextField(max_length=5000)
	is_read = models.BooleanField(default=False, null=True, blank=True)
