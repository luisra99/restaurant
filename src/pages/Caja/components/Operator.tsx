import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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

const Operator = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [dependents, setDependents] = useState<any>([]); // Estado para almacenar los tipos de cuenta
  const [initialValues, setInitialValues] = useState({
    idDependent: null,
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
          idDependent: null,
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
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="idTable">
                  Dependiente (opcional)
                </InputLabel>
                <Field
                  name="idDependent"
                  as={Select}
                  value={`${values.idDependent}`}
                  label="Dependiente (opcional)"
                  error={touched.idDependent && Boolean(errors.idDependent)}
                >
                  <MenuItem value="">Ninguno</MenuItem>
                  {dependents.map((dependent: any, index: number) => (
                    <MenuItem key={index} value={dependent.id}>
                      {dependent.name}
                    </MenuItem>
                  ))}
                </Field>
                {touched.idDependent && errors.idDependent && (
                  <Typography color="error">{errors.idDependent}</Typography>
                )}
              </FormControl>
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

export default Operator;
