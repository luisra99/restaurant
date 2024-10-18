import React, { useEffect, useState } from "react";
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
import { LoadConcept } from "@/utils/concepts";
import { getTable, listTables, postTables, putTables } from "@/services/table";

const MesaSchema = Yup.object().shape({
  name: Yup.string().required("Número de mesa requerido"),
  capacity: Yup.number().required("Capacidad requerida"),
  datails: Yup.string().required("Ubicación requerida"),
});

const Mesas = () => {
  const [mesas, setMesas] = useState<any[]>([]);

  const [initialValues, setInitialValues] = useState({
    name: "",
    capacity: "",
    details: "",
  });
  const Load = async () => {
    const _concepts = await listTables();
    setMesas([..._concepts]);
  };

  useEffect(() => {
    Load();
  }, []);

  const [editingIndex, setEditingIndex] = useState(null);

  const addMesa = async (mesa: any) => {
    if (editingIndex !== null) {
      await putTables(editingIndex, mesa).then(() =>
        setInitialValues({
          name: "",
          capacity: "",
          details: "",
        })
      );
    } else {
      await postTables(mesa);
    }
  };

  const deleteMesa = (index: any) => {
    const updatedMesas = mesas.filter((_, i) => i !== index);
    setMesas(updatedMesas);
  };

  const editMesa = async (index: any) => {
    const concept = await getTable(index);
    setInitialValues(concept);
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Mesa
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={MesaSchema}
        onSubmit={(values, { resetForm }) => {
          addMesa(values);
          resetForm();
        }}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="name"
                as={TextField}
                label="Nombre de la mesa"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="capacity"
                as={TextField}
                label="Capacidad"
                type="number"
                error={touched.capacity && Boolean(errors.capacity)}
                helperText={touched.capacity && errors.capacity}
              />
              <Field
                name="details"
                as={TextField}
                label="Ubicación"
                error={touched.details && Boolean(errors.details)}
                helperText={touched.details && errors.details}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addMesa(values).then(() => Load());
                  resetForm();
                }}
              >
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
                <TableCell>{mesa.name}</TableCell>
                <TableCell>{mesa.capacity}</TableCell>
                <TableCell>{mesa.details}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editMesa(mesa.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteMesa(mesa.is)}>
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
