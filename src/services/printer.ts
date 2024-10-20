import axios from "axios";

export const printAccount = async (id:number) => {
  try {
    const { data } = await axios.post(`http://localhost:4000/printer/account/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
