import axios from 'axios';

const API_KEY = 'at_zwgnVtJKPtRTALbV79GbLcXBPHwhB';

export const fetchIPInfo = async (ip) => {
  const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`);
  return response.data;
};
