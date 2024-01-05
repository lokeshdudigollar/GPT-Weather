import PropTypes from "prop-types";

// Fetch location data from OpenWeatherMap API.
const LocationToCoordinates = async (locationString) => {
    const OWM= process.env.REACT_APP_OWM;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&APPID=${OWM}`
    );
    const locationData = await response.json();
    if (locationData.length === 0) {
      throw new Error("No location by that name. Try again.");
    }
    return locationData;
  } catch (error) {
    console.error("Error:", error);
    return await Promise.reject(error);
  }
};

LocationToCoordinates.propTypes = {
  location: PropTypes.string.isRequired,
};

export default LocationToCoordinates;