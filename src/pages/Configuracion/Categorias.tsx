import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getConcept,
  LoadConcept,
  postConcept,
  putConcept,
} from "@/utils/concepts";

const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre de la categoría requerido"),
});

const Categorias = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    denomination: "",
  });
  const Load = async () => {
    const _concepts = await LoadConcept(1);
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

  const deleteCategoria = (index: any) => {
    const updatedCategorias = concepts.filter((_, i) => i !== index);
    setConcepts(updatedCategorias);
  };

  const editCategoria = async (id: any) => {
    setEditingIndex(id);
    const concept = await getConcept(id);
    setInitialValues(concept);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Categoría de Menú
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
                label="Nombre de la Categoría"
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
                {editingIndex !== null ? "Guardar Cambios" : "Añadir Categoría"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de categorías */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {concepts.map(({ denomination, id }, index) => (
              <TableRow key={index}>
                <TableCell>{denomination}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editCategoria(id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteCategoria(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Categorias;
