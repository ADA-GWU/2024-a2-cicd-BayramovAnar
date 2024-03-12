import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";

// getting current geolocation 
export const currentGeolocationWeather = () => {
    const options = {
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0
    }

    const success = async (pos) =>{
        const crd = pos.coords; 
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=5b302a6dd9b54a4190e7eccd36cd4ae2`
            )
            const result = await response.json(); 
            const weather = await getWeatherData(result.features[0].properties.city); //taking out the city from the response
            resetWeatherContent(result.features[0].properties.city, weather); 
    }   

    const error = (err) => {
        console.log(err.message); 
    }

    navigator.geolocation.getCurrentPosition(success, error, options); 

} 