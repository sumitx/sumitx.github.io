$content = $('#content');


var weatherAPIKey = "09d7f1e96703344071bc75edb08f31c8";
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

	// console.log("current temp: " + tempInF);
	// console.log("conditions: " + data.list[0].weather[0].description);
	$content.empty();
	$content.append("City: " + data.city.name + "<br>");

	$content.append("Temperature: " + tempInF + "<br>");
	conditions =  data.list[0].weather[0].description;
	$content.append("Conditions: " + conditions + "<p>");
	conditions = conditions.split(' ').join('+')
	
	//now do the gif interaction
	handleGif(conditions);

}


function handleGif(conditions){
	console.log(conditions);
	$.get("http://api.giphy.com/v1/gifs/search?q=" + conditions + "&api_key=dc6zaTOxFJmzC", function(data, status) {
		console.log(data.data.length);
		var maxLength = data.data.length - 1;

		var rand = Math.floor((Math.random() * maxLength) + 1);

		$content.append("<div id='image'><img src=" + data.data[rand].images.downsized.url + "></div>");

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

		$('#image').empty();

		$('#image').append("<div id='image'><img src=" + data.data[rand].images.downsized.url + "></div>");

	});
}

$('.input').on("click", function (event) {
	// console.log($('#zip-code').val());
	zipCode = $('#zip-code').val();
	console.log(zipCode);
	getWeather();
	refreshGif();
});

getWeather();



