import { useEffect, useState } from "react";
import axios from "axios";
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
import {
  listDependents,
  postDependent,
  putDependent,
} from "@/services/dependent";
import { notify } from "@/base/utils/notify";

const DependienteSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
});

const Dependientes = () => {
  const [dependents, setDependents] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({ name: "" });

  // Cargar todos los dependientes desde el backend
  const loadDependents = async () => {
    setLoading(true);
    try {
      const dependientes = await listDependents();
      setDependents(dependientes);
    } catch (error) {
      notify("No se pudieron cargar los dependientes", "error");
      console.error("Error consumiendo servicio", error);
      throw new Error("Error consumiendo servicio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDependents();
  }, []);

  const addOrUpdateDependent = async (dependent: any) => {
    if (editingIndex !== null) {
      // Actualizar dependiente existente
      try {
        const updatedDependent = await putDependent(editingIndex, dependent);
        setEditingIndex(null);
      } catch (error) {
        notify("No se pudo editar", "error");
        console.error("Error consumiendo servicio", error);
        throw new Error("Error consumiendo servicio");
      } finally {
        loadDependents();
      }
    } else {
      // Crear nuevo dependiente
      try {
        const newDependent = await postDependent(dependent);
      } catch (error) {
        notify("No se pudo crear", "error");
        console.error("Error consumiendo servicio", error);
        throw new Error("Error consumiendo servicio");
      } finally {
        loadDependents();
      }
    }
  };

  const deleteDependent = async (id: string) => {
    try {
      await axios.delete(`/api/dependents/${id}`);
      notify("Dependinte eliminado");
    } catch (error) {
      notify("No se pudo eliminar", "error");
      console.error("Error consumiendo servicio", error);
      throw new Error("Error consumiendo servicio");
    } finally {
      loadDependents();
    }
  };

  const editDependent = async (index: string) => {
    const { data } = await axios.get(`/api/dependents/${index}`);
    console.log(data);
    setInitialValues({ name: data.name });
    setEditingIndex(index);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Declarar Dependientes
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={DependienteSchema}
        onSubmit={(values, { resetForm }) => {
          addOrUpdateDependent(values);
          setInitialValues({ name: "" });
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="name"
                as={TextField}
                label="Nombre"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Button variant="contained" type="submit">
                {editingIndex !== null
                  ? "Guardar Cambios"
                  : "Añadir Dependiente"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla de dependientes */}
      <Paper sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2}>Cargando...</TableCell>
              </TableRow>
            ) : (
              dependents?.map((dependent, index) => (
                <TableRow key={dependent.id}>
                  <TableCell>{dependent.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editDependent(dependent.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteDependent(dependent.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Dependientes;
