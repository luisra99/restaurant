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
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadConcept } from "@/utils/concepts";
import {
  alterTaxState,
  deleteTaxDiscount,
  getTaxById,
  getTaxes,
  postTax,
  putTax,
} from "@/services/taxes";

const ImpuestoSchema = Yup.object().shape({
  tipo: Yup.string().required("Tipo requerido"),
  porcentaje: Yup.number().required("Porcentaje requerido"),
  tipoValor: Yup.string().required("Debe seleccionar Impuesto o Descuento"),
});
const initialValue = { name: "", percent: "", tax: "1" };

const ImpuestosDescuentos = () => {
  const [initialValues, setInitialValues] = useState(initialValue);
  const [concepts, setConcepts] = useState<any[]>([]);
  const Load = async () => {
    const _concepts = await getTaxes();
    setConcepts(_concepts);
  };

  const [editingIndex, setEditingIndex] = useState(null);

  const addImpuesto = (impuesto: any) => {
    if (editingIndex !== null) {
      putTax(editingIndex, impuesto).then(() => Load());
      setEditingIndex(null);
    } else {
      postTax(impuesto).then(() => Load());
    }
    setInitialValues(initialValue);
  };

  const toggleActivo = (id: any) => {
    alterTaxState(id).then(() => Load());
  };

  const deleteImpuesto = (id: any) => {
    deleteTaxDiscount(id).then(()=>Load())

  };

  const editImpuesto = async (index: any) => {
    const tax = await getTaxById(index);
    setInitialValues({
      tax: `${tax.tax ? 1 : 0}`,
      name: tax.name,
      percent: tax.percent,
    });
    setEditingIndex(index);
  };
  useEffect(() => {
    Load();
  }, []);

  const submit = (values: any, resetForm: any) => {
    console.log("asd");
    addImpuesto(values);
    resetForm();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Impuesto o Descuento
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={ImpuestoSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("asd");
          addImpuesto(values);
          resetForm();
        }}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <RadioGroup name="tax">
                <FormControlLabel
                  control={
                    <Field as={Radio} type="radio" name="tax" value="1" />
                  }
                  label="Impuesto"
                />
                <FormControlLabel
                  control={
                    <Field as={Radio} type="radio" name="tax" value="0" />
                  }
                  label="Descuento"
                />
              </RadioGroup>
              {touched.tax && Boolean(errors.tax) && (
                <Typography color="error">{errors.tax}</Typography>
              )}

              <Field
                name="name"
                as={TextField}
                label="Impuesto o Descuento"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="percent"
                as={TextField}
                label="Porcentaje"
                type="number"
                error={touched.percent && Boolean(errors.percent)}
                helperText={touched.percent && errors.percent}
              />
              <Button
                variant="contained"
                onClick={() => submit(values, resetForm)}
              >
                {editingIndex !== null ? "Guardar Cambios" : "Añadir"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de impuestos/descuentos */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activo</TableCell>
              <TableCell>Tipo Valor</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Porcentaje</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {concepts?.map((impuesto, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={impuesto.status}
                    onChange={() => toggleActivo(impuesto.id)}
                  />
                </TableCell>
                <TableCell>{impuesto.name}</TableCell>
                <TableCell>{impuesto.tax ? "Impuesto" : "Descuento"}</TableCell>
                <TableCell>{impuesto.percent}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editImpuesto(impuesto.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteImpuesto(impuesto.id)}>
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

export default ImpuestosDescuentos;
