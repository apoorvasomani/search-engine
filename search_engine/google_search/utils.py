from re import search

def check_for_youtube_url(url):
	match = search(r"youtube\.com/.*v=([^&]*)", url)
	if match:
		return True
	return False