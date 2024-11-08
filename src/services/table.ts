import { notify } from "@/base/utils/notify";
import axios from "axios";

export const listTables = async () => {
  try {
    const { data } = await axios.get(`/api/tables`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las mesas", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const getTable = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/tables/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener la mesa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const putTables = async (id: string, content: any) => {
  try {
    const { data } = await axios.put(`/api/tables/${id}`, content);
    notify("Mesa modificada");
    return data;
  } catch (error) {
    notify("No se pudo modificar la mesa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const postTables = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/tables`, content);
    notify("Mesa creada");
    return data;
  } catch (error) {
    notify("No se pudo agregar la mesa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteTable = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/tables/${id}`);
    notify("Mesa eliminada");
    return data;
  } catch (error) {
    notify("No se pudo eliminar la mesa", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
