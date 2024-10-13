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

const DivisaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre requerido"),
  tasaCambio: Yup.number().required("Tasa de Cambio requerida"),
});

const Divisas = () => {
  const [divisas, setDivisas] = useState([
    { nombre: "USD", tasaCambio: 1 },
    { nombre: "EUR", tasaCambio: 0.85 },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addDivisa = (divisa: any) => {
    if (editingIndex !== null) {
      const updatedDivisas = [...divisas];
      updatedDivisas[editingIndex] = divisa;
      setDivisas(updatedDivisas);
      setEditingIndex(null);
    } else {
      setDivisas([...divisas, divisa]);
    }
  };

  const deleteDivisa = (index: any) => {
    const updatedDivisas = divisas.filter((_, i) => i !== index);
    setDivisas(updatedDivisas);
  };

  const editDivisa = (index: any) => {
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Divisas
      </Typography>

      <Formik
        initialValues={
          editingIndex !== null
            ? divisas[editingIndex]
            : { nombre: "", tasaCambio: "" }
        }
        enableReinitialize
        validationSchema={DivisaSchema}
        onSubmit={(values, { resetForm }) => {
          addDivisa(values);
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
                name="tasaCambio"
                as={TextField}
                label="Tasa de Cambio"
                type="number"
                error={touched.tasaCambio && Boolean(errors.tasaCambio)}
                helperText={touched.tasaCambio && errors.tasaCambio}
              />
              <Button variant="contained" type="submit">
                {editingIndex !== null ? "Guardar Cambios" : "Añadir Divisa"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de divisas */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tasa de Cambio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {divisas.map((divisa, index) => (
              <TableRow key={index}>
                <TableCell>{divisa.nombre}</TableCell>
                <TableCell>{divisa.tasaCambio}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editDivisa(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteDivisa(index)}>
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

export default Divisas;
