import axios from "axios";

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`/api/offers`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getAccounts = async () => {
  try {
    const { data } = await axios.get(`/api/accounts`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getAccount = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/accounts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
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
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteAccountDetails = async ({ idAccount, idOffer }: any) => {
  try {
    const { data } = await axios.delete(
      `${
        import.meta.env.ENV_SERVER_URL
      }/accounts/details/${idAccount}/${idOffer}`
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteAccount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/accounts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const closeAccount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/accounts/close/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
