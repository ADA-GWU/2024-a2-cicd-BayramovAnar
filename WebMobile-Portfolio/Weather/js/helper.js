import { createContent } from "./content.js"
import { createHeader } from "./header.js"


// function to convert degrees to wind direction 
export const windDirection = (degree) => {
    if (degree > 337.5) {return 'northern'}; 
    if (degree > 292.5) {return 'northwestern'}; 
    if (degree > 247.5) {return 'west'}; 
    if (degree > 202.5) {return 'southwestern'}; 
    if (degree > 157.5) {return 'southern'}; 
    if (degree > 122.5) {return 'southeastern'}; 
    if (degree > 67.5) {return 'eastern'}; 
    if (degree > 22.5) {return 'northeastern'}; 
    return 'northern'; 
}

//function to capitalize the detailed part of weather description 
export const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase()+string.slice(1); 
}


//function for the currentLocation weather data
export const resetWeatherContent = (city, weather) => {
    localStorage.setItem('city', JSON.stringify(city)); //when reloading, user location will be saved 
    document.body.innerHTML = ''; //clearing out the current body elements
    const header = createHeader(city); 
    const content = createContent(weather); 
    document.body.append(header, content); 
}

//functions to change between celsius and fahrenheit
export const toF = (celsius) =>{
    return celsius * 9 / 5 + 32; 
}

export const toC = (fahrenheit) =>{
    return (fahrenheit - 32) * 5 / 9; 
}