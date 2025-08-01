import axios from "axios";

const defaultLocale = "en-US";
const defaultCurrency = "USD";
const defaultCountryCode = "US";

const apiKey = import.meta.env.VITE_API_KEY;
export const Api = axios.create({
  method: "GET",
  baseURL: "https://sky-scrapper.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});

export const getNearByAirports = async (position) => {
  return await Api.get(
    `api/v1/flights/getNearByAirports?lat=${position[0]}&lng=${position[1]}&locale=${defaultLocale}`
  );
};

export const getSearchAirports = async (query) => {
  return await Api.get(
    `api/v1/flights/searchAirport?query=${query}&locale=${defaultLocale}`
  );
};

export const getSearchFlights = async (params) => {
  return await Api.get(
    `api/v2/flights/searchFlights?originSkyId=${params.originSky[0].skyId}&destinationSkyId=${params.destinationSky[0].skyId}&originEntityId=${params.originSky[0].entityId}&destinationEntityId=${params.destinationSky[0].entityId}&date=${params.oneDate}&cabinClass=${params.cabinClass}&adults=${params.passenger.adults}&sortBy=best&currency=${defaultCurrency}&market=${defaultLocale}&countryCode=${defaultCountryCode}`
  );
};
