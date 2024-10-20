import axios from "axios";

export const getTaxes = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/taxDiscounts`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const getTaxById = async (id: number) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/taxDiscounts/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postTax = async (content: any) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/taxDiscounts`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putTax = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/taxDiscounts/${id}`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const alterTaxState = async (id: number) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/taxDiscounts/alterState/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const deleteTaxDiscount = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/taxDiscounts/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
