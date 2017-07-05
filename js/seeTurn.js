function seeTurn(event, text){

	//put into DOM somewhere
	$('#seeTurn').text(text);

	console.log("seeTurn fires element: " + turnMarker);
	 $('#seeTurn').css('left', event.pageX - 10);
	 $('#seeTurn').css('top', event.pageY - 10);
}