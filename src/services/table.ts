import axios from "axios";

export const listTables = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/tables`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getTable = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/tables/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putTables = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/tables/${id}`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postTables = async (content: any) => {
  try {
    const { data } = await axios.post(`http://localhost:4000/tables`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteTable = async (id: number) => {
  try {
    const { data } = await axios.delete(`http://localhost:4000/tables/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
