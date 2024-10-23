import axios from "axios";

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`/api/offers`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getOffer = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/offers/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteOffer = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/offers/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
