import axios from "axios";

export const getTaxes = async () => {
  try {
    const { data } = await axios.get(`/api/taxDiscounts`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getTaxById = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/taxDiscounts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postTax = async (content: any) => {
  try {
    const { data } = await axios.post(`/api/taxDiscounts`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putTax = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(`/api/taxDiscounts/${id}`, content);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const alterTaxState = async (id: number) => {
  try {
    const { data } = await axios.post(`/api/taxDiscounts/alterState/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteTaxDiscount = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/taxDiscounts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
