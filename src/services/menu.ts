import axios from "axios";

export const postOffer = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`/api/offers`, formData);
    return data;
  } catch (error) {
    console.error("Error creando oferta", error);
  }
};

export const putOffer = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) => {
  try {
    const { data } = await axios.put(`/api/offers/${id}`, formData);
    return data;
  } catch (error) {
    console.error("Error editando la oferta", error);
  }
};

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`/api/offers`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getOffer = async (id: string) => {
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
