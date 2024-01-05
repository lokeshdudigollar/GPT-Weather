import  {useState, useEffect} from 'react';
import WeatherData from "./WeatherData";
import PromptToLocation from "./PromptToLocation";
import LocationToCoordinates from './LocationToCoordinates';
import WeatherDescript from './WeahterDescript';
import PropTypes from 'prop-types';

const useApiRequests = (prompt) =>{
    // Fetch location and weather data from API.
    const [locationData, setLocationData] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [promptData, setPromptData] = useState({});
    const [weatherDescription, setWeatherDescription] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if(!prompt) return;

            try{
              const promptDataRes = await PromptToLocation(prompt);
              setPromptData(promptDataRes);

              const locationDataRes = await LocationToCoordinates(
                promptDataRes.locationString
              );
              setLocationData(locationDataRes);

              const weatherDataRes = await WeatherData(locationDataRes);
              setWeatherData(weatherDataRes);

              const weatherDataDescriptRes = await WeatherDescript(
                prompt,
                weatherDataRes

              )
              setWeatherDescription(weatherDataDescriptRes);

              
            }catch(error){
              setError(error);
              console.log("Error", error);

            }
             
          };
          fetchData();
        },[prompt])  // run effect when `prompt` changes
        return { error, promptData, locationData, weatherData, weatherDescription };
  
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default  useApiRequests;
