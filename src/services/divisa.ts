import axios from "axios";

export const listDivisas = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/divisas`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getDivisa = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/divisas/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putDivisa = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/divisas/${id}`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postDivisa = async (content: any) => {
  try {
    const { data } = await axios.post(`http://localhost:4000/divisas`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
