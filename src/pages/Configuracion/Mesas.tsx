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

const MesaSchema = Yup.object().shape({
  numero: Yup.number().required("Número de mesa requerido"),
  capacidad: Yup.number().required("Capacidad requerida"),
  ubicacion: Yup.string().required("Ubicación requerida"),
});

const Mesas = () => {
  const [mesas, setMesas] = useState([
    { numero: 1, capacidad: 4, ubicacion: "Interior" },
    { numero: 2, capacidad: 6, ubicacion: "Terraza" },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addMesa = (mesa: any) => {
    if (editingIndex !== null) {
      const updatedMesas = [...mesas];
      updatedMesas[editingIndex] = mesa;
      setMesas(updatedMesas);
      setEditingIndex(null);
    } else {
      setMesas([...mesas, mesa]);
    }
  };

  const deleteMesa = (index: any) => {
    const updatedMesas = mesas.filter((_, i) => i !== index);
    setMesas(updatedMesas);
  };

  const editMesa = (index: any) => {
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Mesa
      </Typography>

      <Formik
        initialValues={
          editingIndex !== null
            ? mesas[editingIndex]
            : { numero: "", capacidad: "", ubicacion: "" }
        }
        enableReinitialize
        validationSchema={MesaSchema}
        onSubmit={(values, { resetForm }) => {
          addMesa(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="numero"
                as={TextField}
                label="Número de Mesa"
                error={touched.numero && Boolean(errors.numero)}
                helperText={touched.numero && errors.numero}
              />
              <Field
                name="capacidad"
                as={TextField}
                label="Capacidad"
                type="number"
                error={touched.capacidad && Boolean(errors.capacidad)}
                helperText={touched.capacidad && errors.capacidad}
              />
              <Field
                name="ubicacion"
                as={TextField}
                label="Ubicación"
                error={touched.ubicacion && Boolean(errors.ubicacion)}
                helperText={touched.ubicacion && errors.ubicacion}
              />
              <Button variant="contained" type="submit">
                {editingIndex !== null ? "Guardar Cambios" : "Añadir Mesa"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de mesas */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mesas.map((mesa, index) => (
              <TableRow key={index}>
                <TableCell>{mesa.numero}</TableCell>
                <TableCell>{mesa.capacidad}</TableCell>
                <TableCell>{mesa.ubicacion}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editMesa(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteMesa(index)}>
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

export default Mesas;
