var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player');
}

$('.search-button').click(function() {
	var url = $(this).attr('url');
	var search_query = $('.search-text').val();

	var data = {
		csrfmiddlewaretoken: csrf_token,
		search_query: search_query
	}

	$('.loading-image').show();
	setTimeout(function(){}, 44000);
	$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(result) {
				$('.search-items').html(result);
				$('.loading-image').hide();
    }});
});

$(function() {
	$(".video-player").draggable({containment: 'body'});
	$(".video-player").resizable();
	$(".sticky-note").draggable({containment: 'body'});
	$(".sticky-note").resizable();
});

$('.player-move').mousedown(function() {
	$(this).addClass('fa-hand-grab-o');
	$(this).removeClass('fa-hand-stop-o');
});

$('.player-move').mouseup(function() {
	$(this).removeClass('fa-hand-grab-o');
	$(this).addClass('fa-hand-stop-o');
});

$('.note-move').mousedown(function() {
	$(this).addClass('fa-hand-grab-o');
	$(this).removeClass('fa-hand-stop-o');
});

$('.note-move').mouseup(function() {
	$(this).removeClass('fa-hand-grab-o');
	$(this).addClass('fa-hand-stop-o');
});

$('.player-close').mouseup(function() {
	$('.video-player').hide();
	player.pauseVideo();
});

$('.video-url').on('change', function(){
	var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
	var url = $(this).val();
	var validity = url.match(p);
	if (validity)
	{
		$('#player').attr('src', convertUrlToEmbedded(url));
		player.playVideo();
	}
	else {
		$('.error-msg').fadeIn(3000, function() {
			$('.error-msg').html('Not a youtube URL!!');
			$('.error-msg').fadeOut(3000);
		});
	}
});

$(document).on('click','.play-video-link', function(){
	$('.video-player').show();
	$('.video-url').val($(this).attr('url'));
	$('.video-url').trigger('change');
});

$('.video-bar').on('click',function(){
	if($('.video-player').css('display') == 'none') {
		$('.video-player').show();
		if(player.playVideo){
			player.playVideo();
		}
	}
	else {
		$('.video-player').hide();
		if(player.pauseVideo){
			player.pauseVideo();
		}
	}
});

function convertUrlToEmbedded(url) {
	var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
	var replacement = 'http://www.youtube.com/embed/$1?enablejsapi=1&autoplay=1';
	var url = url.replace(pattern1, replacement);

	return url;
}

$('.note-bar').on('click',function(){
	if($('.sticky-note').css('display') == 'none') {
		if($.cookie("note")){
			var content = $.cookie("note");
			$('.note').html(content);
		}
		$('.sticky-note').show();
	}
	else {
		$('.sticky-note').hide();
	}
});

$(".search-text").keyup(function(event){
	if(event.keyCode == 13){
		$(".search-button").trigger('click');
	}
});

$('.note').on('input', function(){
	$.cookie("note", $(this).val());
});

$(document).on('dblclick','.search-result-item',function(){
	var str = "\n" + $(this).find('.url-heading').html() + " - " + $(this).find('.url-path').html() + "\n";
	$('.note').append(str);
});