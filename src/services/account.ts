import axios from "axios";

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/offers`);
    axios.post(`http://localhost:4000/accounts`, {
      name: "Raul",
      description: "el informatico",
      people: 4,
      idDependent: null,
      idTable: null,
    });
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getAccounts = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/accounts`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getAccount = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/accounts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
