import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  getConcept,
  LoadConcept,
  postConcept,
  putConcept,
} from "@/utils/concepts";
import { deleteConcept } from "@/services/concept";

const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre de la categoría requerido"),
});

const InitialCash = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    denomination: "",
  });
  const Load = async () => {
    const _concepts = await LoadConcept("Categorías");
    setConcepts([..._concepts]);
  };

  useEffect(() => {
    Load();
  }, []);

  const addCategoria = async (concept: any) => {
    if (editingIndex !== null) {
      await putConcept(editingIndex, concept).then(() =>
        setInitialValues({
          denomination: "",
        })
      );
    } else {
      await postConcept(1, concept);
    }
  };

  const deleteCategoria = (id: any) => {
    deleteConcept(id).then(() => Load());
  };

  const editCategoria = async (id: any) => {
    setEditingIndex(id);
    const concept = await getConcept(id);
    setInitialValues(concept);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar el efectivo en caja inicial
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={CategoriaSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log("submit");
          addCategoria(values).then(() => Load());
          if (editingIndex) setEditingIndex(null);
          resetForm();
        }}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="denomination"
                as={TextField}
                label="Efectivo en caja"
                error={touched.denomination && Boolean(errors.denomination)}
                helperText={touched.denomination && errors.denomination}
              />
              <Button
                variant="contained"
                onClick={() => {
                  console.log("submit");
                  addCategoria(values).then(() => Load());
                  resetForm();
                }}
              >
                Guardar Cambios
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default InitialCash;
