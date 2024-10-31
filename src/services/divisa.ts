import { notify } from "@/base/utils/notify";
import axios from "axios";

export const listDivisas = async () => {
  try {
    const { data } = await axios.get(`/api/divisas`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las divisas", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const getDivisa = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/divisas/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener la divisa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const putDivisa = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/divisas/${id}`, content);
    notify("Divisa modificada");
    return data;
  } catch (error) {
    notify("No se pudo modificar la divisa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const postDivisa = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/divisas`, content);
    notify("Divisa creada");
    return data;
  } catch (error) {
    notify("No se pudo crear la divisa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteDivisa = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/divisas/${id}`);
    notify("Divisa eliminada");
    return data;
  } catch (error) {
    notify("No se pudo eliminar la divisa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
