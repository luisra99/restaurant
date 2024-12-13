import { notify } from "@/base/utils/notify";
import axios from "axios";

export const postConcept = async (
  father:
    | "Categorías"
    | "Tipo de cuenta"
    | "Áreas"
    | "Tipos de pago"
    | "Estado cuenta"
    | "Divisas",
  content: any
) => {
  try {
    const { data } = await axios.post(`/api/concept/${father}`, content);
    notify("Creado");
    return data;
  } catch (error) {
    notify("No se pudo crear", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getConcepts = async (
  father:
    | "Categorías"
    | "Tipo de cuenta"
    | "Áreas"
    | "Tipos de pago"
    | "Estado cuenta"
    | "Divisas"
): Promise<any[]> => {
  try {
    const { data } = await axios.get(`/api/concept-list/${father}`);
    return data;
  } catch (error) {
    notify("No se pudo crear", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getConcept = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/concept/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const putConcept = async (id: string, content: any) => {
  try {
    const { data } = await axios.put(`/api/concept/${id}`, content);
    notify("Modificado");
    return data;
  } catch (error) {
    notify("No se pudo modificar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const deleteConcept = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/concept/${id}`);
    notify("Eliminado");
    return data;
  } catch (error) {
    notify("No se pudo eliminar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
