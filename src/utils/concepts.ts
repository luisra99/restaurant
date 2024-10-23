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
    console.error("Error consumiendo servicio", error);
  }
};
export const getConcept = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/concepts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putConcept = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/concepts/${id}`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const postConcept = async (fatherId: number, content: any) => {
  try {
    const { data } = await axios.post(`/api/concepts`, {
      fatherId,
      ...content,
    });
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
const conceptsEnum = [];
