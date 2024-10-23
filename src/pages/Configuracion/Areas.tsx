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
import { getConcept, postConcept, putConcept } from "@/services/concept";
import { deleteConcept } from "@/services/concept";

const AreaSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre requerido"),
  details: Yup.string(),
});

const Areas = () => {
  const [concepts, setConcepts] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    denomination: "",
    details: "",
    fatherId: 3,
  });
  const Load = async () => {
    const _concepts = await LoadConcept("Áreas");
    setConcepts(_concepts);
  };
  const [editingIndex, setEditingIndex] = useState(null);

  const addArea = (area: any, resetForm: any) => {
    if (editingIndex !== null) {
      putConcept(editingIndex, area).then(() => {
        Load();
        setInitialValues({
          denomination: "",
          details: "",
          fatherId: 3,
        });
        resetForm();
      });
      setEditingIndex(null);
    } else {
      postConcept(area).then(() => {
        Load();
        resetForm();
      });
    }
  };

  const deleteArea = (id: any) => {
    deleteConcept(id).then(() => Load());
  };

  const editArea = async (id: any) => {
    const concept = await getConcept(id);
    setInitialValues(concept);
    setEditingIndex(id);
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Areas
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={AreaSchema}
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
              <Button
                variant="contained"
                onClick={() => {
                  addArea(values, resetForm);
                }}
              >
                {editingIndex !== null ? "Guardar Cambios" : "Añadir Area"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de areas */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {concepts.map((area, index) => (
              <TableRow key={index}>
                <TableCell>{area.denomination}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editArea(area.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteArea(area.id)}>
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

export default Areas;
