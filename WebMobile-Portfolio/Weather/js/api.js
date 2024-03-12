//The API Calls are made from the https://openweathermap.org 

export const getWeatherData = async (city) => { //func to get the weather data
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=176bb28704e8c3978e81a5dc9031120b&units=metric`); 
        return await response.json()
    } catch (error) {
        console.error
    }
}

//function for latitude and longitude 
export const getWeatherWithCoordinates = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=176bb28704e8c3978e81a5dc9031120b&units=metric`); 
        return await response.json()
    } catch (error) {
        console.error
    }
}

//function for country name display 
export const getCountry = async (country) => { //func to get the weather data
    try {
        //const response = await fetch(`https://restcountries.com/v3.1/alpha/&q=${country}`); 
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country}`); 
        return await response.json()
    } catch (error) {
        console.error
    }
}




