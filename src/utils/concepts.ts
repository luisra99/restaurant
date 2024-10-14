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
