import { notify } from "@/base/utils/notify";
import axios from "axios";

export const pay = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/payments`, paymentData);
    notify("Pago realizado");
    return data;
  } catch (error) {
    notify("No se guardó el pago", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const savePropina = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/operator/savePropina`, paymentData);
    notify("Propina guardada");
    return data;
  } catch (error) {
    notify("No se guardó la propina", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const saveInitialCash = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/operator/initialCash`, paymentData);
    notify("Fondo de caja guardado");
    return data;
  } catch (error) {
    notify("No se guardó el fondo de caja", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const getInitialCash = async () => {
  try {
    const { data } = await axios.get(`/api/operator/initialCash`);
    return data;
  } catch (error) {
    notify("No se pudo obtener el fondo de caja", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
