from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
	"""
	Returns Home Page.
	"""
	template = 'google_search/home.html'
	ctx = {}

	ctx = RequestContext(request, ctx)
	return render_to_response(template, ctx)
