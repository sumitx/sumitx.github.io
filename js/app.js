$content = $('#content');


var weatherAPIKey = "09d7f1e96703344071bc75edb08f31c8";
//Default Zip Code
var zipCode = 11377;

function getWeather() {
	sourceURL = "http://api.openweathermap.org/data/2.5/forecast/weather?zip=" + zipCode + ",us&units=metric&APPID=" + weatherAPIKey

	$.ajax({
		method: 'GET',
		url: sourceURL,
		success: handleResponse
	})
}


function handleResponse(data) {

	//Had to do this since the API wouldn't give me imperical units
	var tempInF = Math.round((data.list[0].main.temp * (9/5)) + 32);

	$content.empty();
	$content.append("<h1>Here's the weather for " + data.city.name + "<br></h1>");

	$content.append("<h2>Temperature: " + tempInF + "</h2><br>");

	toggleBackground(tempInF);

	conditions =  data.list[0].weather[0].description;
	$content.append("<h4>Conditions: " + conditions + "</h4><br>");
	conditions = conditions.split(' ').join('+')
	
	//now do the gif interaction
	handleGif(conditions);

}

//Depending on the temperature we're going to change the background of the div
function toggleBackground(tempRange) {
	if (tempRange < 33) {
		$('.content-section-b').attr('id', 'temperature-background--freezing');
	} else if (tempRange > 33 && tempRange < 51) {
		$('.content-section-b').attr('id', 'temperature-background--cold');
	} else if (tempRange > 51 && tempRange < 76) {
		$('.content-section-b').attr('id', 'temperature-background--warm');
	} else if (tempRange > 76) {
		$('.content-section-b').attr('id', 'temperature-background--hot');
	}
}


function handleGif(conditions){
	$.get("http://api.giphy.com/v1/gifs/search?q=" + conditions + "&api_key=dc6zaTOxFJmzC", function(data, status) {

		var maxLength = data.data.length - 1;

		var rand = Math.floor((Math.random() * maxLength) + 1);

		$content.append("<div id='image'><img src=" + data.data[rand].images.original.url + "></div>");

	});
}


//Allow new Gifs to load on the same page
$('.refresh').on("click", function(event){
	refreshGif()
});


function refreshGif(){
	$.get("http://api.giphy.com/v1/gifs/search?q=" + conditions + "&api_key=dc6zaTOxFJmzC", function(data, status) {
		var maxLength = data.data.length - 1;

		var rand = Math.floor((Math.random() * maxLength) + 1);

		$('#image')
			.empty()
			.append("<div id='image'><img src=" + data.data[rand].images.downsized.url + "></div>");

	});
}

$('.input').on("click", function (event) {
	zipCode = $('#zip-code').val();
	getWeather();
	refreshGif();
});


getWeather();



