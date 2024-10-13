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
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ImpuestoSchema = Yup.object().shape({
  tipo: Yup.string().required("Tipo requerido"),
  porcentaje: Yup.number().required("Porcentaje requerido"),
  tipoValor: Yup.string().required("Debe seleccionar Impuesto o Descuento"),
});

const ImpuestosDescuentos = () => {
  const [impuestos, setImpuestos] = useState([
    { activo: true, tipoValor: "Impuesto", tipo: "IVA", porcentaje: 15 },
    {
      activo: false,
      tipoValor: "Descuento",
      tipo: "Descuento 10%",
      porcentaje: 10,
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addImpuesto = (impuesto: any) => {
    if (editingIndex !== null) {
      const updatedImpuestos = [...impuestos];
      updatedImpuestos[editingIndex] = impuesto;
      setImpuestos(updatedImpuestos);
      setEditingIndex(null);
    } else {
      setImpuestos([...impuestos, impuesto]);
    }
  };

  const toggleActivo = (index: any) => {
    const updatedImpuestos = [...impuestos];
    updatedImpuestos[index].activo = !updatedImpuestos[index].activo;
    setImpuestos(updatedImpuestos);
  };

  const deleteImpuesto = (index: any) => {
    const updatedImpuestos = impuestos.filter((_, i) => i !== index);
    setImpuestos(updatedImpuestos);
  };

  const editImpuesto = (index: any) => {
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Impuesto o Descuento
      </Typography>

      <Formik
        initialValues={
          editingIndex !== null
            ? impuestos[editingIndex]
            : { tipo: "", porcentaje: "", tipoValor: "Impuesto" }
        }
        enableReinitialize
        validationSchema={ImpuestoSchema}
        onSubmit={(values, { resetForm }) => {
          addImpuesto(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <RadioGroup name="tipoValor">
                <FormControlLabel
                  control={
                    <Field
                      as={Radio}
                      type="radio"
                      name="tipoValor"
                      value="Impuesto"
                    />
                  }
                  label="Impuesto"
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Radio}
                      type="radio"
                      name="tipoValor"
                      value="Descuento"
                    />
                  }
                  label="Descuento"
                />
              </RadioGroup>
              {touched.tipoValor && Boolean(errors.tipoValor) && (
                <Typography color="error">{errors.tipoValor}</Typography>
              )}

              <Field
                name="tipo"
                as={TextField}
                label="Impuesto o Descuento"
                error={touched.tipo && Boolean(errors.tipo)}
                helperText={touched.tipo && errors.tipo}
              />
              <Field
                name="porcentaje"
                as={TextField}
                label="Porcentaje"
                type="number"
                error={touched.porcentaje && Boolean(errors.porcentaje)}
                helperText={touched.porcentaje && errors.porcentaje}
              />
              <Button variant="contained" type="submit">
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
            {impuestos.map((impuesto, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={impuesto.activo}
                    onChange={() => toggleActivo(index)}
                  />
                </TableCell>
                <TableCell>{impuesto.tipoValor}</TableCell>
                <TableCell>{impuesto.tipo}</TableCell>
                <TableCell>{impuesto.porcentaje}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editImpuesto(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteImpuesto(index)}>
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
