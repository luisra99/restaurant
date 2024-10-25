import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getInitialCash, saveInitialCash } from "@/services/payments";

const CategoriaSchema = Yup.object().shape({
  initialCash: Yup.string().required("Nombre de la categoría requerido"),
});

const InitialCash = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [initialValues, setInitialValues] = useState({
    initialCash: "",
  });
  const Load = async () => {
    const data = await getInitialCash();
    setInitialValues(data);
  };

  useEffect(() => {
    Load();
  }, []);

  const _saveInitialCash = async (concept: any) => {
    const data = await saveInitialCash(concept);
    setInitialValues(data);
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

          _saveInitialCash(values).then(() => Load());
          if (editingIndex) setEditingIndex(null);
          resetForm();
        }}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="initialCash"
                as={TextField}
                type="number"
                label="Efectivo en caja"
                error={touched.initialCash && Boolean(errors.initialCash)}
                helperText={touched.initialCash && errors.initialCash}
              />
              <Button
                variant="contained"
                onClick={() => {
                  console.log("submit");
                  _saveInitialCash(values).then(() => Load());
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
