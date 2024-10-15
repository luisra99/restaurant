import axios from "axios";

export const LoadConcept = async (idPadre: number) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/concepts/father/${idPadre}`
    );
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
export const postConcept = async (fatherId: number, content: any) => {
  try {
    const { data } = await axios.post(`http://localhost:4000/concepts`, {
      fatherId,
      ...content,
    });
    return data;
  } catch (error) {
    console.error("Error consumiendo servicio", error);
  }
};
