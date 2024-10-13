import React, { useState } from "react";
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
import { Camera, CameraAlt } from "@mui/icons-material";

const areas = ["Cocina", "Bar", "Cafeteria", "Bebidas"];
const categorias = ["Entrante", "Pastas", "Postres", "Bebidas"];

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("El nombre es obligatorio"),
  briefDescription: Yup.string().required("La descripción es obligatoria"),
  detailedDescription: Yup.string().required("Los detalles son obligatorios"),
  area: Yup.string().required("El área es obligatoria"),
  categoria: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("Debe ser un número positivo"),
});

const AddMenuOffer = () => {
  const [preview, setPreview] = useState(null); // Estado para almacenar la vista previa de la imagen

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agregar Oferta al Menú
      </Typography>
      <Formik
        initialValues={{
          productImage: null,
          productName: "",
          briefDescription: "",
          detailedDescription: "",
          categoria: "",
          area: "",
          price: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {/* Campo de nombre del producto */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="productName"
                as={TextField}
                label="Nombre de la oferta"
                variant="outlined"
                error={touched.productName && Boolean(errors.productName)}
                helperText={touched.productName && errors.productName}
              />
            </FormControl>

            {/* Campo de descripción breve */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Field
                name="briefDescription"
                as={TextField}
                label="Descripción Breve"
                variant="outlined"
                error={
                  touched.briefDescription && Boolean(errors.briefDescription)
                }
                helperText={touched.briefDescription && errors.briefDescription}
              />
            </FormControl>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <Field
                    name="detailedDescription"
                    as={TextField}
                    label="Detalles"
                    variant="outlined"
                    multiline
                    rows={6}
                    error={
                      touched.detailedDescription &&
                      Boolean(errors.detailedDescription)
                    }
                    helperText={
                      touched.detailedDescription && errors.detailedDescription
                    }
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
                      id="productImage"
                      onChange={(event: any) => {
                        const file = event.target.files[0];
                        setFieldValue("productImage", file);

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
                  {errors.productImage && touched.productImage && (
                    <Typography color="error">{errors.productImage}</Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Campo de descripción extensa */}

            {/* Campo de selección del área */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="area">Área</InputLabel>
              <Field
                name="area"
                as={Select}
                variant="outlined"
                label="Área"
                error={touched.area && Boolean(errors.area)}
              >
                {areas.map((area, index) => (
                  <MenuItem key={index} value={area}>
                    {area}
                  </MenuItem>
                ))}
              </Field>
              {touched.area && errors.area && (
                <Typography color="error">{errors.area}</Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="area">Categoría</InputLabel>
              <Field
                name="categoria"
                as={Select}
                variant="outlined"
                label="Categoría"
                error={touched.categoria && Boolean(errors.categoria)}
              >
                {categorias.map((categoria, index) => (
                  <MenuItem key={index} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Field>
              {touched.categoria && errors.categoria && (
                <Typography color="error">{errors.categoria}</Typography>
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
              <Button variant="text" color="primary" fullWidth>
                Limpiar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Agregar Oferta
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMenuOffer;
