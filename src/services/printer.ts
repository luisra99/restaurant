import { notify } from "@/base/utils/notify";
import axios from "axios";

export const printAccount = async (id: number) => {
  try {
    const { data } = await axios.post(`/api/printer/account/${id}`);
    notify("Impreso correctamente");
    return data;
  } catch (error) {
    notify("No se pudo imprimir", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
