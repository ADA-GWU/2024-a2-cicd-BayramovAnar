import { getWeatherData } from "./api.js";
import { resetWeatherContent, toC, toF } from "./helper.js";
import { currentGeolocationWeather } from "./location.js";
import { getWeatherWithCoordinates } from "./api.js"; 

//func to display the header info
export const createHeader = (city) => {
    const header = document.createElement('header'); 
    const headerContainer = document.createElement('div'); 
    const headerCity = document.createElement('div'); 
    const headerCountry = document.createElement('div'); 
    const headerUnit = document.createElement('div'); 

    const cityChange = document.createElement('button'); 
    const cityLocation = document.createElement('button'); 
    const coordinatesButton = document.createElement('button'); 
    const cityName = document.createElement('h1'); 

    const unitC = document.createElement('button'); 
    const unitF = document.createElement('button'); 

    const cityInner = document.createElement('div'); 
    const searchBlock = document.createElement('div'); 
    const searchInput = document.createElement('input'); 
    const searchBtn = document.createElement('button'); 
    const errBlock = document.createElement('p'); 

    const coordinatesBlockDiv = document.createElement('div'); 
    const coordinatesForm = document.createElement('form');
    const coordinatesBlockInput1 = document.createElement('input'); 
    const coordinatesBlockInput2 = document.createElement('input'); 
    const coordinatesFormBtn = document.createElement('button');  

    coordinatesForm.setAttribute("method", "post"); 
    coordinatesBlockInput1.setAttribute("type", "text"); 
    coordinatesBlockInput1.setAttribute("name", "lat");
    coordinatesBlockInput1.setAttribute("placeholder", "Latitude");

    coordinatesBlockInput2.setAttribute("type", "text"); 
    coordinatesBlockInput2.setAttribute("name", "lon");
    coordinatesBlockInput2.setAttribute("placeholder", "Longitude");

    coordinatesBlockDiv.classList.add('coordinates_div'); 
    coordinatesForm.classList.add('coordinates_form'); 
    coordinatesBlockInput1.classList.add('coordinates_inp1'); 
    coordinatesBlockInput2.classList.add('coordinates_inp2'); 

    coordinatesFormBtn.classList.add('formBtn'); 

    header.classList.add('header'); 
    headerContainer.classList.add('container', 'header__container'); 
    headerCity.classList.add('header__city'); 
    headerCountry.classList.add('header__country'); 
    headerUnit.classList.add('header__unit'); 

    cityChange.classList.add('city__change', 'btn-reset'); 
    cityLocation.classList.add('city__location', 'btn-reset'); 
    coordinatesButton.classList.add('btn-reset', 'coordinatesBtn'); 
    cityName.classList.add('city__name'); 
    cityInner.classList.add('city__inner'); 

    unitC.classList.add('unit__c', 'btn-reset', 'unit-current'); 
    unitF.classList.add('unit__f', 'btn-reset'); 

    searchBlock.classList.add('search'); 
    searchInput.classList.add('search_input'); 
    searchBtn.classList.add('search_btn'); 
    errBlock.classList.add('search__error'); 

    searchBtn.textContent = 'OK'; 
    cityName.textContent = city; 
    cityChange.textContent = 'Change city';
    cityLocation.textContent = 'Current location';
    coordinatesButton.textContent = 'Latitude/Longitude';
    coordinatesFormBtn.textContent = "OK";

    unitC.textContent = 'C°'; 
    unitF.textContent = 'F°'; 

    cityLocation.addEventListener('click', currentGeolocationWeather); 

    const showError = (message) =>{
        errBlock.classList.add('show__error'); 
        errBlock.textContent = message; 
    }
   
    cityChange.addEventListener('click', () => {
        headerCity.innerHTML = ''; 
        searchBlock.append(searchInput, searchBtn, errBlock); 
        headerCity.append(searchBlock); 
    }); 

    coordinatesButton.addEventListener('click', () => {
       headerCity.innerHTML = '';
       coordinatesBlockDiv.append(coordinatesForm, coordinatesBlockInput1, coordinatesBlockInput2, coordinatesFormBtn); 
       headerCity.append(coordinatesBlockDiv);
        
    }); 

    coordinatesFormBtn.addEventListener('click', async () => {
        if(!coordinatesBlockInput1.value || !coordinatesBlockInput2.value){
            return showError("Please enter both latitude and longitude"); 
        }
        try {
            const weather = await getWeatherWithCoordinates(coordinatesBlockInput1.value, coordinatesBlockInput2.value); 
            console.log(weather); 
            if(weather.message){
                showError(weather.message); 
                return; 
            }
            resetWeatherContent(weather.name, weather); 
        } catch (error) {
           console.log(error); 
        }
     }); 

   

     searchBtn.addEventListener('click', async () => {
        if(!searchInput.value){
            return showError("Please enter a city"); 
        }
        try {
            const weather = await getWeatherData(searchInput.value); 
            console.log(weather); 
            if(weather.message){
                showError(weather.message); 
                return; 
            }
            resetWeatherContent(weather.name, weather); 
        } catch (error) {
           console.log(error); 
        }
     }); 


     window.addEventListener('click', (e) =>{
        if(e.target == searchInput || e.target == searchBtn || e.target == cityChange || e.target == coordinatesButton || e.target == coordinatesForm || e.target == coordinatesBlockInput1 || e.target == coordinatesBlockInput2 || e.target == coordinatesFormBtn){
            return; 
        }else{
            headerCity.innerHTML = ''; 
            errBlock.classList.remove('show__error'); 
            headerCity.append(cityName, cityInner); 
        }
     }); 

     unitC.addEventListener('click', () => {
        if(unitC.classList.contains('unit-current')) return;   
        
        unitC.classList.add('unit-current'); 
        unitF.classList.remove('unit-current'); 

        document.querySelector('.weather__unit').textContent = '°'; 
        const temp = document.querySelector('.weather__temperature'); 
        const converted = toC(+temp.textContent); 
        temp.textContent = Math.round(converted); 
     });


     unitF.addEventListener('click', () => {
        if(unitF.classList.contains('unit-current')) return;   
        
        unitF.classList.add('unit-current'); 
        unitC.classList.remove('unit-current'); 

        document.querySelector('.weather__unit').textContent = 'F'; 
        const temp = document.querySelector('.weather__temperature'); 
        const converted = toF(+temp.textContent); 
        temp.textContent = Math.round(converted); 
     });







    header.append(headerContainer); 
    headerContainer.append(headerCity, headerUnit); 
    cityInner.append(cityChange, coordinatesButton, cityLocation); 
    headerCity.append(cityName, cityInner);
    headerUnit.append(unitC, unitF); 
    
    return header;
}

    