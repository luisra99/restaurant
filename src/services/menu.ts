import { notify } from "@/base/utils/notify";
import axios from "axios";

export const postOffer = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`/api/offers`, formData);
    notify("Oferta creada");
    return data;
  } catch (error) {
    notify("No se pudo crear la oferta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
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
    notify("Oferta modificada");
    return data;
  } catch (error) {
    notify("No se pudo modificar la oferta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`/api/offers`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las ofertas", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getOffer = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/offers/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener la oferta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteOffer = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/offers/${id}`);
    notify("Oferta eliminada");
    return data;
  } catch (error) {
    notify("No se pudo eliminar la oferta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
