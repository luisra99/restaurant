import axios from "axios";

export const listDivisas = async () => {
  try {
    const { data } = await axios.get(`/api/divisas`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getDivisa = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/divisas/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putDivisa = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/divisas/${id}`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postDivisa = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/divisas`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteDivisa = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/divisas/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
