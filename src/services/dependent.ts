import axios from "axios";

export const listDependents = async () => {
  try {
    const { data } = await axios.get("/api/dependents");
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
export const putDependent = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/dependents/${id}`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postDependent = async (content: any) => {
  try {
    const { data } = await axios.post("/api/dependents", content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const deleteDependent = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/dependents/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
