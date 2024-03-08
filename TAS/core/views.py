#Core Django
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import render, redirect
from django.http import FileResponse, HttpResponse
from django.contrib import messages 

from .forms import MessageForm

#This app 
from .forms import MessageForm

#Python 

#Third parties 
import stripe 




# Create your views here.
def index(request, payment_complete=False):
	if request.method == "GET":
		payment_complete = request.session.get('payment_complete')
		msg_form = MessageForm()
		context = {'payment_complete':payment_complete, 'msg_form':msg_form}
		return render(request, "core/index.html", context) 
	if request.method == "POST":
		msg_form = MessageForm(request.POST or None)
		if msg_form.is_valid():
			msg_form.save() #Save the model form, create the message
			messages.success(request, "Your message has been submitted!")
			return redirect("index") 
		else:
			messages.warning(request, "Invalid Field - your message was not submitted.")
			return redirect("index")




def view_preview(request):
	if request.method == "GET":
		return FileResponse(open('core/static/preview/TheAfricaStory_preview_pdf.pdf', 'rb'), content_type='application/pdf')

def success(request, file_type=None):
	stripe.api_key = settings.STRIPE_SECRET_KEY
	session_id = request.GET.get('session_id')
	if file_type:
		request.session['file_type'] = file_type
	if session_id:
		try:
			# Retrieve the session from Stripe
			session = stripe.checkout.Session.retrieve(session_id)
			
			# Optional: Perform additional checks here, e.g., session.payment_status == 'paid'
			if session.payment_status == 'paid':
				# Payment was successful, and you can safely provide the eBook download
				request.session['payment_complete'] = True
				messages.success(request, "Thank you for your purchase! Enjoy the book!")
				return redirect('index')
			else:
				# Payment was not successful
				messages.error(request, "There was an error processing your payment. You have not been charged. Please try again.")
				return redirect('index')
		except stripe.error.StripeError as e:
			# Handle the error, e.g., log it and present an error message to the user
				messages.error(request, f"There was an error processing your payment. You have not been charged. If you contact support please include this error message: {e}")
				return redirect('index')
	else:
		# session_id is missing
				messages.error(request, f"There was an error processing your payment. You have not been charged. If you contact support please include this error message: Payment ID not found.")
				return redirect('index')


def set_session_variable(request):
	# Set a session variable
	request.session['payment_complete'] = True 
	return JsonResponse({'status': 'Session variable set'})

def unset_session_variable(request):
	# Unset/remove a session variable
	if 'payment_complete' in request.session:
		del request.session['payment_complete']
	return JsonResponse({'status': 'Session variable unset'})

@require_http_methods(["GET"])
def download_ebook(request):
	# Check if the user has paid
	if not request.session.get('payment_complete', False):
		messages.error(request, "You have not paid for this book.")
		return redirect('index')
	try:
		file_type = request.session.get('file_type')
		file_type_paths = {'PDF':'core/static/books/TheAfricaStory_ebook.pdf', 'EPUB':'core/static/books/TheAfricaStory_epub.epub', 'MOBI':'core/static/books/TheAfricaStory_mobi.mobi', 'AZW3':'core/static/books/TheAfricaStory_azw3.azw3'}
		content_type_dict = {'PDF':'pdf', 'EPUB':'epub', 'MOBI':'mobi', 'AZW3':'azw3'}
		content_type = content_type_dict.get(request.session['file_type'])
		return FileResponse(open(file_type_paths.get(file_type), 'rb'), as_attachment=True, content_type='application/{}'.format(content_type))
	except Exception as e:
		return HttpResponse(f"Sorry, an error occured serving your book. Please email MarshallScribesInc@protonmail.com and include this error message {e} . And we will email you your ebook.", status=404)
