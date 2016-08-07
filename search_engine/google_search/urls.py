from django.conf.urls.defaults import patterns, url

from .ajax_views import search_item
from .views import home

urlpatterns = patterns('',
    url(r'^$', home, name='home'),
    url(r'^AJAX/search-item/$', search_item, name='search_item'),
)
