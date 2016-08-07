from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^google_search/', include('google_search.urls')),
)
