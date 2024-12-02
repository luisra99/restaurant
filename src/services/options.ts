import { notify } from "@/base/utils/notify";
import axios from "axios";

export const getOptions = async (concept: string) => {
  try {
    const { data } = await axios.get(`/api/options/${concept}`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las opciones", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
