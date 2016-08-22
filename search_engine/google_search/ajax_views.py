from googleapiclient.discovery import build

from django.shortcuts import render_to_response
from django.template import RequestContext

from .constants import GOOGLE_API_KEY, GOOGLE_CSE_KEY
from .models import SearchRecord
from .utils import check_for_youtube_url

def google_search(search_term, **kwargs):
	"""
	Google Custom Search API call.
	"""
	service = build("customsearch", "v1",developerKey=GOOGLE_API_KEY)
	result = service.cse().list(q=search_term,cx=GOOGLE_CSE_KEY,)
	result = result.execute()
	result = result['items']

	for item in result:
		item['is_youtube_url'] = check_for_youtube_url(item['formattedUrl'])

	return result


def search_item(request):
	"""
	Returns search results for query string.
	"""
	template = 'google_search/search_result.html'

	ctx= {}
	kwargs = {}

	search_query = request.POST['search_query']
	ip_address = request.META['REMOTE_ADDR']

	kwargs = {
		'search_query': search_query,
		'ip_address': ip_address
	}

	record = SearchRecord.objects.create(**kwargs)

	result = google_search(search_query)
	ctx['result'] = result

	ctx = RequestContext(request, ctx)
	return render_to_response(template, ctx)