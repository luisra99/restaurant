import axios from "axios";

export const printAccount = async (id: number) => {
  try {
    const { data } = await axios.post(`/api/printer/account/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
