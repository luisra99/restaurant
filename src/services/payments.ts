import axios from "axios";

export const pay = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/payments`, paymentData);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const savePropina = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/operator/savePropina`, paymentData);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const saveInitialCash = async (paymentData: any) => {
  try {
    const { data } = await axios.post(`/api/operator/initialCash`, paymentData);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getInitialCash = async () => {
  try {
    const { data } = await axios.get(`/api/operator/initialCash`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
