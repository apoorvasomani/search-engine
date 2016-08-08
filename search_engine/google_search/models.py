from django.db import models

class SearchRecord(models.Model):
	"""
	Model to store search history.
	"""
	ip_address = models.IPAddressField()
	search_query = models.TextField()
	timestamp = models.DateTimeField(auto_now=True)
