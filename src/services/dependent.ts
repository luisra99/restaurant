import { notify } from "@/base/utils/notify";
import axios from "axios";

export const listDependents = async () => {
  try {
    const { data } = await axios.get("/api/dependents");
    return data;
  } catch (error) {
    notify("No se pudieron obtener los dependientes", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const getDivisa = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/divisas/${id}`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las divisas", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const putDependent = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/dependents/${id}`, content);
    notify("Dependiente modificado");
    return data;
  } catch (error) {
    notify("No se pudo modificar el dependiente", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const postDependent = async (content: any) => {
  try {
    const { data } = await axios.post("/api/dependents", content);
    notify("Dependiente creado");
    return data;
  } catch (error) {
    notify("No se pudo crear el dependiente", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const deleteDependent = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/dependents/${id}`);
    notify("Dependiente eliminado");
    return data;
  } catch (error) {
    notify("No se pudo crear el dependiente", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
