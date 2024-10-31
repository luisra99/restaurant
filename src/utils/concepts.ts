import { notify } from "@/base/utils/notify";
import axios from "axios";

export const LoadConcept = async (
  fatherDenomination:
    | "Categorías"
    | "Tipo de cuenta"
    | "Áreas"
    | "Tipos de pago"
    | "Estado cuenta"
    | "Divisas"
) => {
  try {
    const { data } = await axios.post(`/api/concept`, {
      fatherDenomination,
    });
    return data;
  } catch (error) {
    notify(`Error cargando ${fatherDenomination}`, "error");
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
export const postConcept = async (fatherId: number, content: any) => {
  try {
    const { data } = await axios.post(`/api/concepts`, {
      fatherId,
      ...content,
    });
    notify("Creado");
    return data;
  } catch (error) {
    notify("No se pudo crear", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
const conceptsEnum = [];
