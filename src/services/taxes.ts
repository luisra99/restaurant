import { notify } from "@/base/utils/notify";
import axios from "axios";

export const getTaxes = async () => {
  try {
    const { data } = await axios.get(`/api/taxDiscounts`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener los impuestos y descuentos", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getTaxById = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/taxDiscounts/${id}`);
    return data;
  } catch (error) {
    notify("No se pudo obtener el impuesto o descuento", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const postTax = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/taxDiscounts`, content);
    notify("Creado");
    return data;
  } catch (error) {
    notify("No se pudo guardar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const putTax = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/taxDiscounts/${id}`, content);
    notify("Modificado");
    return data;
  } catch (error) {
    notify("No se pudo actualizar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const alterTaxState = async (id: number) => {
  try {
    const { data } = await axios.post(`/api/taxDiscounts/alterState/${id}`);
    notify("Modificado");
    return data;
  } catch (error) {
    notify("No se pudo actualizar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteTaxDiscount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/taxDiscounts/${id}`);
    notify("Eliminado");
    return data;
  } catch (error) {
    notify("No se pudo eliminar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
