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
  Avatar,
  Grid,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { CameraAlt } from "@mui/icons-material";
import { LoadConcept } from "@/utils/concepts";
import axios from "axios";
import { getOffer } from "@/services/menu";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  details: Yup.string().required("Los detalles son obligatorios"),
  idArea: Yup.string().required("El área es obligatoria"),
  idCategory: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("Debe ser un número positivo"),
});

const AddMenuOffer = ({ id, handleClose }: any) => {
  const [preview, setPreview] = useState<null | string>(null); // Estado para almacenar la vista previa de la imagen
  const [areas, setAreas] = useState([]);
  const navegar = useNavigate();
  const [initialValues, setInitialValues] = useState({
    image: null,
    name: "",
    description: " ",
    details: " ",
    idCategory: "",
    idArea: "",
    price: "",
  });
  const [categorys, setCategorys] = useState([]);
  const Load = async (id?: any) => {
    const conceptoArea = await LoadConcept("Áreas");
    const conceptoCategory = await LoadConcept("Categorías");
    if (id) {
      const offer = await getOffer(id);
      setInitialValues(offer);
      setPreview(`/api/public/${offer.image}`);
    }
    setAreas(conceptoArea);
    setCategorys(conceptoCategory);
  };
  useEffect(() => {
    Load(id);
  }, [id]);
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const formData = new FormData();

    // Agregar valores al FormData
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("details", values.details);
    formData.append("idCategory", values.idCategory);
    formData.append("idArea", values.idArea);
    formData.append("price", values.price);

    try {
      if (id) {
        await axios.put(`/api/offers/${id}`, formData);
        handleClose();
      } else {
        await axios.post(`/api/offers`, formData);
      }

      // Resetear el formulario y la vista previa después de la creación exitosa
      resetForm();
      setPreview(null);
      alert("Oferta agregada con éxito");
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error al agregar la oferta");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Modificar oferta" : "Agregar Oferta al Menú"}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <Form>
              {/* Campo de nombre del producto */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Field
                  name="name"
                  as={TextField}
                  label="Nombre de la oferta"
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </FormControl>

              {/* Campo de descripción breve */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Field
                  name="description"
                  as={TextField}
                  label="Descripción Breve"
                  variant="outlined"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </FormControl>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <Field
                      name="details"
                      as={TextField}
                      label="Detalles"
                      variant="outlined"
                      multiline
                      rows={6}
                      error={touched.details && Boolean(errors.details)}
                      helperText={touched.details && errors.details}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  {" "}
                  <FormControl fullWidth sx={{ marginBottom: 2, flexGrow: 1 }}>
                    <Box sx={{ width: "100%", height: 100, marginBottom: 2 }}>
                      {preview ? (
                        <Avatar
                          src={preview}
                          alt="Vista previa"
                          variant="rounded"
                          sx={{ width: "100%", height: 120 }}
                        />
                      ) : (
                        <Avatar
                          alt="Vista previa"
                          variant="rounded"
                          sx={{ width: "100%", height: 120 }}
                        >
                          <CameraAlt />
                        </Avatar>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      startIcon={<PhotoCamera />}
                      sx={{ marginBottom: 1, position: "absolute", bottom: 0 }}
                    >
                      Subir foto
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        id="file"
                        onChange={(event: any) => {
                          const file = event.target.files[0];
                          setFieldValue("image", file);

                          // Crear vista previa de la imagen
                          const reader: any = new FileReader();
                          reader.onloadend = () => {
                            setPreview(reader.result); // Actualiza el estado con la vista previa de la imagen
                          };
                          if (file) {
                            reader.readAsDataURL(file);
                          } else {
                            setPreview(null);
                          }
                        }}
                      />
                    </Button>
                    {errors.image && touched.image && (
                      <Typography color="error">{errors.image}</Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {/* Campo de descripción extensa */}

              {/* Campo de selección del área */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="idArea">Área</InputLabel>
                <Field
                  name="idArea"
                  as={Select}
                  variant="outlined"
                  label="Área"
                  error={touched.idArea && Boolean(errors.idArea)}
                >
                  {areas.map((area: any, index) => (
                    <MenuItem key={index} value={area.id}>
                      {area.denomination}
                    </MenuItem>
                  ))}
                </Field>
                {touched.idArea && errors.idArea && (
                  <Typography color="error">{errors.idArea}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="idArea">Categoría</InputLabel>
                <Field
                  name="idCategory"
                  as={Select}
                  variant="outlined"
                  label="Categoría"
                  error={touched.idCategory && Boolean(errors.idCategory)}
                >
                  {categorys.map((category: any, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.denomination}
                    </MenuItem>
                  ))}
                </Field>
                {touched.idCategory && errors.idCategory && (
                  <Typography color="error">{errors.idCategory}</Typography>
                )}
              </FormControl>

              {/* Campo de precio */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Field
                  name="price"
                  as={TextField}
                  label="Precio"
                  variant="outlined"
                  type="number"
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </FormControl>

              <Box display={"flex"} justifyContent={"space-between"} gap={1}>
                {/* Botón de submit */}
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {id ? "Actualizar" : "Agregar Oferta"}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddMenuOffer;
