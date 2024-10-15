import axios from "axios";

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/offers`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
