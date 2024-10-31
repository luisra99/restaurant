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

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`/api/offers`);
    return data;
  } catch (error) {
    notify("No se pudo obtener el menú", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getAccounts = async () => {
  try {
    const { data } = await axios.get(`/api/accounts`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener las cuentas", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};

export const getAccount = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/accounts/${id}`);
    return data;
  } catch (error) {
    notify("No se pudieron obtener los datos de la cuenta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const modifyAccountDetails = async ({
  idAccount,
  quantity,
  negative,
  idOffer,
}: any) => {
  try {
    const { data } = await axios.put(`/api/accounts/details`, {
      idAccount,
      quantity,
      negative,
      idOffer,
    });
    notify("Cuenta modificada");
    return data;
  } catch (error) {
    notify("No se pudieron modificar los detalles de la cuenta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteAccountDetails = async ({ idAccount, idOffer }: any) => {
  try {
    const { data } = await axios.delete(
      `${
        import.meta.env.ENV_SERVER_URL
      }/accounts/details/${idAccount}/${idOffer}`
    );
    notify("Eliminado");
    return data;
  } catch (error) {
    notify("No se pudo eliminar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const deleteAccount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/accounts/${id}`);
    notify("Cuenta eliminada");
    return data;
  } catch (error) {
    notify("No se pudo eliminar la cuenta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const closeAccount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/accounts/close/${id}`);
    notify("Cuenta cerrada");
    return data;
  } catch (error) {
    notify("No se pudo cerrar la cuenta", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const modifyAccount = async (id: any, values: any) => {
  try {
    const { data } = await axios.put(`/api/accounts/${id}`, values);
    notify("Cuenta modificada");
    return data;
  } catch (error) {
    notify("No se pudo mofdificar", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
export const createAccount = async (values: any) => {
  try {
    const { data } = await axios.post(`/api/accounts/`, values);
    notify("Cuenta creada");
    return data;
  } catch (error) {
    notify("No se pudo crear", "error");
    console.error("Error consumiendo servicio", error);
    throw new Error("Error consumiendo servicio");
  }
};
