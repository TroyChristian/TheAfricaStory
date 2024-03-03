#Core Django
from django.shortcuts import render
from django.http import FileResponse

#Python 

#Third parties 


# Create your views here.
def index(request):
	return render(request, "core/index.html") 

def view_preview(request):
	if request.method == "GET":
		return FileResponse(open('core/static/preview/TheAfricaStory_preview_pdf.pdf', 'rb'), content_type='application/pdf')