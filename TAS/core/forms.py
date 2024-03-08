# Django
from django import forms

#this app
from .models import Message


class MessageForm(forms.ModelForm):
	class Meta:
		model = Message 
		exclude = ['is_read'] 

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in self.fields.values():
			field.label = ''  # Disable all labels in the form

		self.fields['sender_email'].widget.attrs.update({'class':"inputs", 'placeholder':'Your email'})
		self.fields['sender_name'].widget.attrs.update({'class':"inputs", 'placeholder': 'Your name'})
		self.fields['content'].widget.attrs.update({'class':"inputs", 'placeholder': 'Type your message'})
