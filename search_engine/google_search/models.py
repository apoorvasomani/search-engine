from django.db import models

class SearchRecord(models.Model):
	"""
	Model to store search history.
	"""
	ip_address = models.IPAddressField()
	search_query = models.CharField(max_length=500)
	timestamp = models.DateTimeField(auto_now=True)