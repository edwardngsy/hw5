window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value

      // - Get a reference to the element containing the user-entered location
      let daysInput = document.querySelector(`#days`)

      // - Get the user-entered location from the element's value
      let days = daysInput.value
  
      // - Check to see if the user entered anything; if so:
      if (location.length & days.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=${days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
        let dailyForecast = json.forecast
  
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
  
        // Fill the current element with the location and current weather conditions
        currentElement.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">  
              <span class="temperature">${currentWeather.temp_f}</span>° 
              and
              <span class="conditions">${currentWeather.condition.text}</span>
            </div>
          </div>
        `
      
        //  Select element to modify
        let pagemodifyelement = document.querySelector (`.forecast`)

        //  Empty rides div element
        pagemodifyelement.innerHTML = `<div class="text-center space-y-8">
        <div class="font-bold text-3xl">${days} Days Forecast</div>`
        // Creating a for loop to display daily forecast 
        for (let i=0; i < days; i++) {
            pagemodifyelement.insertAdjacentHTML(
            `beforeend`,
            `<div>
              <h1 class="text-2xl text-bold text-gray-500 text-center space-y-8">${dailyForecast.forecastday[i].date}</h1>
              <h2 class="text-xl text-center space-y-8"> High ${dailyForecast.forecastday[i].day.maxtemp_f} – Low ${dailyForecast.forecastday[i].day.mintemp_f}</h2>
              <p class="text-gray-500 text-center space-y-8">${dailyForecast.forecastday[i].day.condition.text}</h1>
            </div>
            <div>
            `)}
      }
    })
  })
