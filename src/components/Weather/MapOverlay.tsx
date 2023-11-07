import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function MapOverlay() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {

    const fetchDataFromGovApi = async () => {
      try {
        const apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
        await axios
          .get(apiUrl)
          .then((response) => {
            console.log(response.data)
              setWeatherData(response.data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      }
      
      catch(error){
        toast.error('Error: ' + error)
      }
    }
    fetchDataFromGovApi()

    
    const google = window.google;
    if(!isLoading){
      const script = window.document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVYfFNABDUezksK4S-2ceg8APDpbVIT8o&callback=initMap`;
      script.defer = true;
      script.async = true;
      window.document.head.appendChild(script);
    }

    window.initMap = async () => {
        try{

            const mapOptions: google.maps.MapOptions = {
                center: { lat: 1.3521, lng: 103.8198 }, //starting position
                zoom: 10,
              };
        
              const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
        
              for(let i=0; i<weatherData.area_metadata.length; i++){
                const marker = new google.maps.Marker(
                  {
                    position: new google.maps.LatLng(weatherData.area_metadata[i].label_location.latitude, weatherData.area_metadata[i].label_location.longitude),
                    map: map,
                    title: weatherData.area_metadata[i].name,
                  }
                );

                const infowindow = new google.maps.InfoWindow({
                  content: '2 hour forecast: ' + weatherData.items[0].forecasts[i].forecast,
                });
          
                marker.addListener('click', () => {
                  infowindow.open(map, marker);
                });
              }
              setIsLoading(true)
              
        }

        catch (error){
            console.error('Error in initMap: ', error)
        }
    };
  }, []);

  return(
    <>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      {/* <div>
        <h2>2-Hour Weather Forecast</h2>
        {weatherData ? (
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </div> */}
    </>
  ) 
}

export default MapOverlay;
