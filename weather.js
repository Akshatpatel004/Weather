document.addEventListener("DOMContentLoaded", function() {
	let searchbox= document.getElementById("citysearch");
	let button= document.getElementById("submit");

	function btn() {
		main(searchbox.value);
	}

	async function  main(c) {
		const apiKey = 'ebc204662b88edba0e9d201278b7fe90';
		const city = c||"Surat";
    	const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		try {
			let response = await fetch(apiurl);
			let data = await response.json();
			console.log(data);

			if (response.status !== 200) {
				document.getElementById("error").style.display="block";
			} else{
				document.getElementById("error").style.display="none";
		
				document.getElementById("city_name").innerHTML=data.name;
				document.getElementById("temp").innerHTML=Math.round(data.main.temp);
				let rise = document.getElementById("rise");
				let weather_icon = document.getElementById("weather_icon");
				let set = document.getElementById("set");
				document.getElementById("humidity").innerHTML=data.main.humidity + "%";
				document.getElementById("wind").innerHTML=data.wind.speed + "km/h";

				// sunrise time and senset time
				let sunriseTimestamp = data.sys.sunrise;
				let sunsetTimestamp = data.sys.sunset;  
				let sunriseDate = new Date(sunriseTimestamp * 1000); // Convert to milliseconds
				let sunsetDate = new Date(sunsetTimestamp * 1000); // Convert to milliseconds
				// Format the sunrise time (e.g., "HH:mm")
				let options = { hour: '2-digit', minute: '2-digit' };
				let sunriseTime = sunriseDate.toLocaleTimeString('en-US', options); 
				let sunsetTime = sunsetDate.toLocaleTimeString('en-US', options);
				// console.log(`Sunrise in ${city}: ${sunriseTime}`); 
				// console.log(`Sunset in ${city}: ${sunsetTime}`); 

				rise.innerText=sunriseTime;
				set.innerText=sunsetTime;

				if (data.weather[0].main =="Clouds") {
					weather_icon.src="image/clouds.png"
				}
				else if (data.weather[0].main =="Clear"){
					weather_icon.src="image/clear.png"
				}
				else if (data.weather[0].main =="Rain"){
					weather_icon.src="image/rainy.png"
				}
            else if (data.weather[0].main =="mist"){
					weather_icon.src="image/Mist.jpg"
				}
				else if (data.weather[0].main =="Drizzle"){
					weather_icon.src="image/drizzle.jpeg"
				}
			}
		} catch(error){
			document.getElementById("error").style.display="block";
			console.error("Error fetching the weather data:", error);
		}

	};
	button.addEventListener("click", btn);

});
