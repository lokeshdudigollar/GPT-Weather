import PropTypes from "prop-types";

//Fetc weather data from Openweather API



const  WeatherData = async(locationData) => {
    const OWM=  process.env.REACT_APP_OWM;
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
                locationData[0].lat
            }&lon=${locationData[0].lon}&APPID=${OWM}`
        );
        const WeatherData = await response.json();
        return WeatherData;   
    }catch(error){
        console.log("Error", error);
        return await Promise.reject('Unable to fetch weather data');
    } 
};

WeatherData.propTypes = {
    locationData: PropTypes.string.isRequired,
  };

export default WeatherData;
