import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { LoadConcept } from "@/utils/concepts"; // Para cargar conceptos como tipos de cuenta
import axios from "axios";
import { listTables } from "@/services/table";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().nullable(),
  people: Yup.number().positive("Debe ser un número positivo").nullable(),
  idDependent: Yup.string().nullable(), // Este campo es opcional
  idTable: Yup.string().nullable(), // La mesa puede ser opcional
});

const OpenAccount = () => {
  const [tables, setTables] = useState([]); // Estado para almacenar las mesas
  const [accountTypes, setAccountTypes] = useState([]); // Estado para almacenar los tipos de cuenta

  // Cargar las mesas y los tipos de cuenta desde el backend
  const loadOptions = async () => {
    const tableConcepts = await listTables(); // ID para cargar mesas
    const typeConcepts = await LoadConcept(2); // ID para tipos de cuenta
    setTables(tableConcepts);
    setAccountTypes(typeConcepts);
  };

  useEffect(() => {
    loadOptions();
  }, []);

  // Manejo del envío del formulario
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/accounts",
        values
      );

      resetForm();
      alert("Cuenta abierta con éxito");
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al abrir la cuenta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Abrir Nueva Cuenta
      </Typography>
      <Formik
        initialValues={{
          name: "",
          description: null,
          people: null,
          idDependent: null,
          idTable: null,
          idType: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {/* Nombre de la cuenta */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="name"
                as={TextField}
                label="Nombre de la cuenta"
                variant="outlined"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </FormControl>

            {/* Descripción de la cuenta */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="description"
                as={TextField}
                label="Descripción"
                variant="outlined"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </FormControl>

            {/* Número de personas */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="people"
                as={TextField}
                label="Número de personas"
                variant="outlined"
                type="number"
                error={touched.people && Boolean(errors.people)}
                helperText={touched.people && errors.people}
              />
            </FormControl>

            {/* Mesa opcional */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="idTable">Mesa (opcional)</InputLabel>
              <Field
                name="idTable"
                as={Select}
                label="Mesa (opcional)"
                error={touched.idTable && Boolean(errors.idTable)}
              >
                <MenuItem value="">Ninguna</MenuItem>
                {tables.map((table: any, index) => (
                  <MenuItem key={index} value={table.id}>
                    {table.name}
                  </MenuItem>
                ))}
              </Field>
              {touched.idTable && errors.idTable && (
                <Typography color="error">{errors.idTable}</Typography>
              )}
            </FormControl>

            {/* Dependiente (opcional) */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="idDependent"
                as={TextField}
                label="ID Dependiente (opcional)"
                variant="outlined"
                type="text"
                error={touched.idDependent && Boolean(errors.idDependent)}
                helperText={touched.idDependent && errors.idDependent}
              />
            </FormControl>

            {/* Tipo de cuenta */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="idType">Tipo de Cuenta</InputLabel>
              <Field
                name="idType"
                as={Select}
                label="Tipo de Cuenta"
                error={touched.idType && Boolean(errors.idType)}
              >
                {accountTypes.map((type: any, index) => (
                  <MenuItem key={index} value={type.id}>
                    {type.denomination}
                  </MenuItem>
                ))}
              </Field>
              {touched.idType && errors.idType && (
                <Typography color="error">{errors.idType}</Typography>
              )}
            </FormControl>

            <Box display="flex" justifyContent="space-between" gap={1}>
              {/* Botón de limpiar */}
              <Button variant="text" color="primary" fullWidth>
                Limpiar
              </Button>
              {/* Botón de submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Abrir Cuenta
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OpenAccount;
