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

const DependienteSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre requerido"),
  email: Yup.string().email("Email inválido").required("Email requerido"),
});

const Dependientes = () => {
  const [dependientes, setDependientes] = useState([
    { nombre: "Juan Pérez", email: "juan@gmail.com" },
    { nombre: "María Gómez", email: "maria@gmail.com" },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addDependiente = (dependiente: any) => {
    if (editingIndex !== null) {
      const updatedDependientes = [...dependientes];
      updatedDependientes[editingIndex] = dependiente;
      setDependientes(updatedDependientes);
      setEditingIndex(null);
    } else {
      setDependientes([...dependientes, dependiente]);
    }
  };

  const deleteDependiente = (index: any) => {
    const updatedDependientes = dependientes.filter((_, i) => i !== index);
    setDependientes(updatedDependientes);
  };

  const editDependiente = (index: any) => {
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Dependientes
      </Typography>

      <Formik
        initialValues={
          editingIndex !== null
            ? dependientes[editingIndex]
            : { nombre: "", email: "" }
        }
        enableReinitialize
        validationSchema={DependienteSchema}
        onSubmit={(values, { resetForm }) => {
          addDependiente(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="nombre"
                as={TextField}
                label="Nombre"
                error={touched.nombre && Boolean(errors.nombre)}
                helperText={touched.nombre && errors.nombre}
              />
              <Field
                name="email"
                as={TextField}
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Button variant="contained" type="submit">
                {editingIndex !== null
                  ? "Guardar Cambios"
                  : "Añadir Dependiente"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de dependientes */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dependientes.map((dependiente, index) => (
              <TableRow key={index}>
                <TableCell>{dependiente.nombre}</TableCell>
                <TableCell>{dependiente.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editDependiente(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteDependiente(index)}>
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

export default Dependientes;