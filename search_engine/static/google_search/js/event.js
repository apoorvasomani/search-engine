$('.search-button').click(function() {

	var url = $(this).attr('url');
	var search_query = $('.search-text').val();

	data = {
		csrfmiddlewaretoken: csrf_token,
		search_query: search_query
	}

	$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(result) {
				$('.search-result').html(result);
    }});
});
