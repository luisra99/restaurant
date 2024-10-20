import axios from "axios";

export const listDependents = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/dependents");
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
export const putDependent = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/dependents/${id}`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postDependent = async (content: any) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/dependents",
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const deleteDependent = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/dependents/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
