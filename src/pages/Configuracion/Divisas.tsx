import { useEffect, useState } from "react";
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
import { getDivisa, postDivisa, putDivisa } from "@/services/divisa";
import { deleteConcept } from "@/services/concept";

const DivisaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre requerido"),
  tasaCambio: Yup.number().required("Tasa de Cambio requerida"),
});

const Divisas = () => {
  const [concepts, setConcepts] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    denomination: "",
    details: "",
  });
  const Load = async () => {
    const _concepts = await LoadConcept("Divisas");
    setConcepts(_concepts);
  };
  const [editingIndex, setEditingIndex] = useState(null);

  const addDivisa = (divisa: any, resetForm: any) => {
    if (editingIndex !== null) {
      putDivisa(editingIndex, divisa).then(() => {
        Load();
        setInitialValues({
          denomination: "",
          details: "",
        });
        resetForm();
      });
      setEditingIndex(null);
    } else {
      postDivisa(divisa).then(() => {
        Load();
        resetForm();
      });
    }
  };

  const deleteDivisa = (id: any) => {
    deleteConcept(id).then(() => Load());
  };

  const editDivisa = async (index: any) => {
    const concept = await getDivisa(index);
    setInitialValues(concept);
    setEditingIndex(index);
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Divisas
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={DivisaSchema}
        onSubmit={(values, { resetForm }) => {}}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="denomination"
                as={TextField}
                label="Nombre"
                error={touched.denomination && Boolean(errors.denomination)}
                helperText={touched.denomination && errors.denomination}
              />
              <Field
                name="details"
                as={TextField}
                label="Tasa de Cambio"
                type="number"
                error={touched.details && Boolean(errors.details)}
                helperText={touched.details && errors.details}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addDivisa(values, resetForm);
                }}
              >
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
            {concepts.map((divisa, index) => (
              <TableRow key={index}>
                <TableCell>{divisa.denomination}</TableCell>
                <TableCell>{divisa.details}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editDivisa(divisa.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteDivisa(divisa.id)}>
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
