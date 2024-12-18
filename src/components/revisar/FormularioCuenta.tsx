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
  Grid,
} from "@mui/material";
import { createAccount, getAccount, modifyAccount } from "@/services/account";
import { listDependents } from "@/services/dependent";
import { useNavigate } from "react-router-dom";
import { getConcepts } from "@/services/concept";
import { getOptions } from "@/services/options";

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
  const [accountTypes, setAccountTypes] = useState<any[]>([]); // Estado para almacenar los tipos de cuenta
  const navegar = useNavigate();
  // Cargar las mesas y los tipos de cuenta desde el backend
  const loadOptions = async () => {
    const tableConcepts = await getOptions("tables"); // ID para cargar mesas
    const dependentsList = await listDependents(); // ID para tipos de cuenta
    const typeConcepts = await getConcepts("Tipo de cuenta"); // ID para tipos de cuenta
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
    if (id) {
      const account = await modifyAccount(id, values);
      if (account) {
        resetForm();
        handleClose?.(account);
      }
    } else {
      await createAccount(values).then((data) => {
        navegar(`/manage?id=${data.id}`);
        handleClose?.();
      });
    }
    setSubmitting(false);
  };

  return (
    <Grid container justifyContent={"center"} display={"flex"} height={"100%"}>
      <Grid item xs={10} sm={7} md={3} margin={"auto"}>
        <Typography variant="h4" gutterBottom>
          {id ? "Actualizar detalles de la cuenta" : "Nueva Cuenta"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnMount
          validateOnChange
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
                  value={values.idType}
                  onChange={(e: any) => setFieldValue("idType", e.target.value)}
                  name="idType"
                  aria-label="Platform"
                  fullWidth
                >
                  {accountTypes?.map((type: any) => (
                    <ToggleButton value={type?.id} key={type?.id}>
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
                  value={[values.idTable]}
                  label="Mesa (opcional)"
                  error={touched.idTable && Boolean(errors.idTable)}
                >
                  <MenuItem value="">Ninguna</MenuItem>
                  {tables?.map((table: any, index: number) => (
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
                <InputLabel htmlFor="idTable">
                  Dependiente (opcional)
                </InputLabel>
                <Field
                  name="idDependent"
                  as={Select}
                  value={[values.idDependent]}
                  label="Dependiente (opcional)"
                  error={touched.idDependent && Boolean(errors.idDependent)}
                >
                  <MenuItem value="">Ninguno</MenuItem>
                  {dependents?.map((dependent: any, index: number) => (
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
      </Grid>
    </Grid>
  );
};

export default OpenAccount;
