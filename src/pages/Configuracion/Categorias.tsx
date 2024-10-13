import React, { useState } from "react";
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

const CategoriaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre de la categoría requerido"),
});

const Categorias = () => {
  const [categorias, setCategorias] = useState([
    { nombre: "Entrantes" },
    { nombre: "Platos principales" },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addCategoria = (categoria: any) => {
    if (editingIndex !== null) {
      const updatedCategorias = [...categorias];
      updatedCategorias[editingIndex] = categoria;
      setCategorias(updatedCategorias);
      setEditingIndex(null);
    } else {
      setCategorias([...categorias, categoria]);
    }
  };

  const deleteCategoria = (index: any) => {
    const updatedCategorias = categorias.filter((_, i) => i !== index);
    setCategorias(updatedCategorias);
  };

  const editCategoria = (index: any) => {
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Categoría de Menú
      </Typography>

      <Formik
        initialValues={
          editingIndex !== null ? categorias[editingIndex] : { nombre: "" }
        }
        enableReinitialize
        validationSchema={CategoriaSchema}
        onSubmit={(values, { resetForm }) => {
          addCategoria(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="nombre"
                as={TextField}
                label="Nombre de la Categoría"
                error={touched.nombre && Boolean(errors.nombre)}
                helperText={touched.nombre && errors.nombre}
              />
              <Button variant="contained" type="submit">
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
            {categorias.map((categoria, index) => (
              <TableRow key={index}>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editCategoria(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteCategoria(index)}>
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
