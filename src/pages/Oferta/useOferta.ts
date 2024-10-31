import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as Yup from "yup";
import { LoadConcept } from "@/utils/concepts";
import { getOffer, postOffer, putOffer } from "@/services/menu";

// Interfaces para los tipos de datos utilizados
interface OfferValues {
  name: string;
  price: string;
  idCategory: string;
  idArea: string;
  image: File | null;
  description: string;
  details: string;
}

interface UseOfertaProps {
  id?: string;
  handleClose: () => void;
}

interface FormHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

// Esquema de validación Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("Debe ser un número positivo"),
  idArea: Yup.string().required("El área es obligatoria"),
  idCategory: Yup.string().required("La categoría es obligatoria"),
  description: Yup.string(),
  details: Yup.string(),
});

// Hook personalizado
const useOferta = ({ id, handleClose }: UseOfertaProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [areas, setAreas] = useState<any[]>([]);
  const [categorys, setCategorys] = useState<any[]>([]);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const priceInputRef = useRef<HTMLInputElement | null>(null);

  const initialValues: OfferValues = useMemo(
    () => ({
      name: "",
      price: "",
      idCategory: "",
      idArea: "",
      image: null,
      description: "",
      details: "",
    }),
    []
  );

  const [formValues, setFormValues] = useState<OfferValues>(initialValues);

  const loadData = useCallback(async () => {
    const [conceptoArea, conceptoCategory] = await Promise.all([
      LoadConcept("Áreas"),
      LoadConcept("Categorías"),
    ]);

    if (id) {
      const offer = await getOffer(id);
      setFormValues(offer);
      setPreview(`/api/public/${offer.image}`);
    }

    setAreas(conceptoArea);
    setCategorys(conceptoCategory);
  }, [id]);

  const handleFocus = useCallback(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleNameKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      priceInputRef.current?.focus();
    }
  };

  useEffect(() => {
    handleFocus();
    loadData();
  }, [handleFocus, loadData]);

  const handleSubmit = useCallback(
    async (values: OfferValues, { setSubmitting, resetForm }: FormHelpers) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value as string | Blob);
      });

      try {
        if (id) {
          await putOffer({ formData, id });
          handleClose();
        } else {
          await postOffer(formData);
          setFormValues({
            ...values,
            name: "",
            price: "",
            image: null,
            description: "",
            details: "",
          });
          handleFocus();
        }

        id && setFormValues(initialValues);
        resetForm();
        setPreview(null);
        alert("Oferta agregada con éxito");
      } catch (error) {
        console.error(error);
        alert("Ha ocurrido un error al agregar la oferta");
      } finally {
        setSubmitting(false);
      }
    },
    [id, handleClose, handleFocus, initialValues]
  );

  return {
    formValues,
    validationSchema,
    categorys,
    areas,
    preview,
    handleSubmit,
    nameInputRef,
    setPreview,
    priceInputRef,
    handleNameKeyDown,
  };
};

export default useOferta;
