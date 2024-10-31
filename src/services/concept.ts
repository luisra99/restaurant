import { notify } from "@/base/utils/notify";
import axios from "axios";

export const deleteConcept = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/concepts/${id}`);
    notify("Eliminado");
    return data;
  } catch (error) {
    notify("No se pudo eliminar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getConcept = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/concepts/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const putConcept = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/concepts/${id}`, content);
    notify("Modificado");
    return data;
  } catch (error) {
    notify("No se pudo modificar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const postConcept = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/concepts`, content);
    notify("Creado");
    return data;
  } catch (error) {
    notify("No se pudo crear", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
