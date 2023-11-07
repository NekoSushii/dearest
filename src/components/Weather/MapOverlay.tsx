import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import sunny from '../../resources/image/sunny.png'
import cloudy from '../../resources/image/cloudy.png'
import lightRain from '../../resources/image/lightrain.png'
import heavyRain from '../../resources/image/heavyrain.png'

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function MapOverlay() {
  const [weatherData, setWeatherData] = useState<any>();
  const [rainData, setRainData] = useState<any>();
  const [isForecastLoading, setIsForecastLoading] = useState<boolean>(true)
  const [isRainLoading, setIsRainLoading] = useState<boolean>(true)
  const [toggleView, setToggleView] = useState<boolean>(false)

  useEffect(() => {

    //async function to fetch 2 hr forecast data
    const fetchForecastData = async() => {

      try {
        const apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
        await axios
          .get(apiUrl)
          .then((response) => {
            setWeatherData(response.data);
            setIsForecastLoading(false)
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      }
      
      catch(error){
        toast.error('Error: ' + error)
      }
    }
    fetchForecastData()

    //async function to fetch actual rainfall data
    const fetchActualData = async() => {
      try {
        const apiUrl = 'https://api.data.gov.sg/v1/environment/rainfall';
        await axios
          .get(apiUrl)
          .then((response) => {
            setRainData(response.data);
            setIsRainLoading(false)
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      }
      
      catch(error){
        toast.error('Error: ' + error)
      }
    }
    fetchActualData()

  }, []);


    //ensure that the data is loaded before generating the google map
    if(isRainLoading === false && isForecastLoading === false){

      const google = window.google;
      const script = window.document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVYfFNABDUezksK4S-2ceg8APDpbVIT8o&callback=initMap`;
      script.defer = true;
      script.async = true;
      window.document.head.appendChild(script);
    
      window.initMap = async () => {
          try{
  
              const mapOptions: google.maps.MapOptions = {
                  center: { lat: 1.3521, lng: 103.8198 }, //starting position
                  zoom: 10,
                };
          
                const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);


                if(toggleView === true){

                  //marker and info window generation for 2 hour forecast data
                  for(let i=0; i<weatherData.area_metadata.length; i++){

                    var weatherIcon = ''
                    const weatherString: string = JSON.stringify(weatherData.items[0].forecasts[i].forecast)
                    if(weatherString.includes('sun')){
                      weatherIcon = sunny
                    }
                    else if(weatherString.includes('Cloudy')){
                      weatherIcon = cloudy
                    }
                    else if(weatherString.includes('Showers')){
                      weatherIcon = lightRain
                    }
                    else{
                      weatherIcon = heavyRain
                    }

                    const marker = new google.maps.Marker(
                      {
                        position: new google.maps.LatLng(weatherData.area_metadata[i].label_location.latitude, weatherData.area_metadata[i].label_location.longitude),
                        icon: weatherIcon,
                        map: map,
                      }
                    );

                    const contentString =
                      '<div>' +
                      '<h1>' + weatherData.area_metadata[i].name + '</h1>' + 
                      '<h2> 2 hour forecast: ' + weatherData.items[0].forecasts[i].forecast + '</h2>' +
                      '</div>'

                    const infowindow = new google.maps.InfoWindow({
                      content: contentString
                    });

                    marker.addListener('click', () => {
                      infowindow.open(map, marker);
                    });
                  }

                }
                else if(toggleView === false){

                  //marker and info window generation for actual rainfall data
                  for(let i=0; i<rainData.metadata.stations.length; i++){

                    var weatherIcon = ''
                    if(rainData.items[0].readings[i].value === 0){
                      weatherIcon = sunny
                    }
                    else if(rainData.items[0].readings[i].value < 1){
                      weatherIcon = cloudy
                    }
                    else if(rainData.items[0].readings[i].value < 10){
                      weatherIcon = lightRain
                    }
                    else{
                      weatherIcon = heavyRain
                    }

                  const marker = new google.maps.Marker(
                    {
                      position: new google.maps.LatLng(rainData.metadata.stations[i].location.latitude, rainData.metadata.stations[i].location.longitude),
                      icon: weatherIcon,
                      map: map,
                    }
                  );
                }
                  // const contentString =
                  //   '<div>' +
                  //   '<h1>' + rainData.metadata.stations[i].name + '</h1>' + 
                  //   '<h2> Rainfall precipitation (mm): ' + rainData.items[0].readings[i].value + '</h2>' +
                  //   '</div>'
  
                  // const infowindow = new google.maps.InfoWindow({
                  //   content: contentString
                  // });
            
                  // marker.addListener('click', () => {
                  //   infowindow.open(map, marker);
                  // });
                }
                
                
          }
  
          catch (error){
              console.error('Error in initMap: ', error)
          }
      };
    }

  const swapView = () => {
    if(toggleView === true){
      setToggleView(false)
    }
    else if(toggleView === false){
      setToggleView(true)
    }
  }

  return(
    <>
      <div id="map" style={{ width: '100%', height: '1200px' }} />
      <button onClick={swapView} style={{padding: '1rem', margin: '1rem'}}>
        {toggleView? (
          'Realtime Rainfall'
        ) : (
          '2 Hour Forecast'
        )}
      </button>
    </>
  ) 
}

export default MapOverlay;
