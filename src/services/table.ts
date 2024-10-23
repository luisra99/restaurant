import axios from "axios";

export const listTables = async () => {
  try {
    const { data } = await axios.get(`/api/tables`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getTable = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/tables/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putTables = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/tables/${id}`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postTables = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/tables`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteTable = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/tables/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
