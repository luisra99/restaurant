import { useEffect, useState } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import { listTables } from "@/services/table";
import { getAccount } from "@/services/account";
import { listDependents } from "@/services/dependent";
import { useNavigate } from "react-router-dom";
import { LoadConcept } from "@/utils/concepts";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().when("idTable", {
    is: (value: any) => !value,
    then: (schema) => schema.required("El nombre es obligatorio"),
  }),
  description: Yup.string().nullable(),
  people: Yup.number().positive("Debe ser un número positivo").nullable(),
  idDependent: Yup.string().nullable(), // Este campo es opcional
  idTable: Yup.string().nullable(), // La mesa puede ser opcional
});
const OpenAccount = ({ id, idTable, handleClose }: any) => {
  const [tables, setTables] = useState<any>([]); // Estado para almacenar las mesas
  const [dependents, setDependents] = useState<any>([]); // Estado para almacenar los tipos de cuenta
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    description: null,
    people: null,
    idDependent: null,
    idTable: idTable ?? null,
    idType: null,
  });
  const [accountTypes, setAccountTypes] = useState([]); // Estado para almacenar los tipos de cuenta
  const navegar = useNavigate();
  // Cargar las mesas y los tipos de cuenta desde el backend
  const loadOptions = async () => {
    const tableConcepts = await listTables(); // ID para cargar mesas
    const dependentsList = await listDependents(); // ID para tipos de cuenta
    const typeConcepts = await LoadConcept("Tipo de cuenta"); // ID para tipos de cuenta
    setAccountTypes(typeConcepts);
    setTables(tableConcepts);
    setDependents(dependentsList);
  };

  useEffect(() => {
    loadOptions();
  }, []);
  useEffect(() => {
    if (id) {
      getAccount(id).then(
        ({ name, description, people, idDependent, idTable, idType }: any) => {
          setInitialValues(
            structuredClone({
              name,
              description,
              people,
              idDependent,
              idTable,
              idType,
            })
          );
        }
      );
    }
  }, [id]);

  // Manejo del envío del formulario
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      if (id) {
        const response = await axios.put(`/api/accounts/${id}`, values);
      } else {
        const { data } = await axios.post("/api/accounts", values);
        if (data.id) {
          navegar(`/manage?id=${data.id}`);
        }
      }

      resetForm();
      alert("Cuenta abierta con éxito");
      handleClose?.();
    } catch (error: any) {
      console.error(error);
      alert("Ha ocurrido un error al abrir la cuenta: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Actualizar detalles de la cuenta" : "Nueva Cuenta"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }: any) => (
          <Form>
            {/* Nombre de la cuenta */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="name"
                as={TextField}
                label="Nombre de la cuenta"
                variant="outlined"
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                as={ToggleButtonGroup}
                color="primary"
                exclusive
                value={`${values.idType}`}
                onChange={(e: any) => setFieldValue("idType", e.target.value)}
                name="idType"
                aria-label="Platform"
                fullWidth
              >
                {accountTypes?.map((type: any) => (
                  <ToggleButton value={`${type?.id}`}>
                    {type?.denomination}
                  </ToggleButton>
                ))}
              </Field>
            </FormControl>

            {/* Descripción de la cuenta */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="description"
                as={TextField}
                label="Descripción"
                value={values.description ?? ""}
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
                value={values.people ?? ""}
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
                value={`${values.idTable}`}
                label="Mesa (opcional)"
                error={touched.idTable && Boolean(errors.idTable)}
              >
                <MenuItem value="">Ninguna</MenuItem>
                {tables.map((table: any, index: number) => (
                  <MenuItem key={index} value={table.id}>
                    {table.name}
                  </MenuItem>
                ))}
              </Field>
              {touched.idTable && errors.idTable && (
                <Typography color="error">{errors.idTable}</Typography>
              )}
            </FormControl>

            {/* DEpendiente opcional */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="idTable">Dependiente (opcional)</InputLabel>
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

            <Box display="flex" justifyContent="space-between" gap={1}>
              {/* Botón de limpiar */}
              <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={() => handleClose()}
              >
                Cerrar
              </Button>
              {/* Botón de submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {id ? "Actualizar información" : "Abrir Cuenta"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OpenAccount;
