var timer = null;
var results = null;
var index = 0;
var page = 1;
var search = null;

$(function(){

	$('#add').click(search_flickr);

});

function search_flickr()
{
	search = $('#search').val();
	sendMessage();
}

function sendMessage()
{
	$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b3688a044ac8104b07abd243c04a1c32&text=' + search + '&per_page=50&page=' + page + '&format=json&jsoncallback=?', startTimer);	
}


function startTimer(data)
{
	timer = setInterval(showPhoto, 500);
	results = data;
}

function showPhoto()
{
	var item = results.photos.photo[index];
	var src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
	var div = $('<div>');
	div.addClass('photo');
	var img = $('<img>');
	img.attr('src', src);
	div.append(img);
	$('#photos').prepend(div);

	if(results.photos.perpage == (index + 1))
		getNextPage();
	else
		index++;
}

function getNextPage()
{
	page++;
	index = 0;
	clearInterval(timer);
	sendMessage();
}
