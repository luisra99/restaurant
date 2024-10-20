import axios from "axios";

export const pay = async (paymentData: any) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/payments`,
      paymentData
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const listConcepts = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/concepts`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const getConcept = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/concepts/${id}`);
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
export const putConcept = async (id: number, content: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/concepts/${id}`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};

export const postConcept = async (content: any) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/concepts`,
      content
    );
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
