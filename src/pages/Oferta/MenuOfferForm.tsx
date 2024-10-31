// AddMenuOffer.tsx
import { Formik, Form } from "formik";
import { Typography, Grid } from "@mui/material";
import useOferta from "./useOferta";
import FieldWithError from "@/components/FieldWithError";
import AreaSelect from "@/components/AreaSelect";
import CategorySelect from "@/components/CategorySelect";
import ImageUpload from "@/components/ImageUpload";
import SubmitButtons from "@/components/SubmitButtons";

const AddMenuOffer = ({ id, handleClose }: any) => {
  const {
    formValues,
    validationSchema,
    categorys,
    areas,
    preview,
    handleSubmit,
    nameInputRef,
    priceInputRef,
    handleNameKeyDown,
    setPreview,
  } = useOferta({ id, handleClose });

  return (
    <Grid container justifyContent={"center"} display={"flex"} height={"100%"}>
      <Grid item xs={10} sm={7} md={3} margin={"auto"}>
        {" "}
        <Typography variant="h4" gutterBottom>
          {id ? "Modificar oferta" : "Agregar Oferta al Menú"}
        </Typography>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <FieldWithError
                name="name"
                label="Nombre de la oferta"
                error={errors.name}
                touched={touched.name}
                inputRef={nameInputRef}
                onKeyDown={handleNameKeyDown}
              />
              <FieldWithError
                name="price"
                label="Precio"
                type="number"
                error={errors.price}
                touched={touched.price}
                inputRef={priceInputRef}
              />
              <AreaSelect
                name="idArea"
                areas={areas}
                error={errors.idArea}
                touched={touched.idArea}
              />
              <CategorySelect
                name="idCategory"
                categories={categorys}
                error={errors.idCategory}
                touched={touched.idCategory}
              />
              <FieldWithError
                name="description"
                label="Descripción Breve"
                error={errors.description}
                touched={touched.description}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FieldWithError
                    name="details"
                    label="Detalles"
                    multiline
                    rows={6}
                    error={errors.details}
                    touched={touched.details}
                  />
                </Grid>
                <Grid item xs={6} display={"flex"}>
                  <ImageUpload
                    preview={preview}
                    setPreview={setPreview}
                    setFieldValue={setFieldValue}
                    error={errors.image}
                    touched={touched.image}
                  />
                </Grid>
              </Grid>
              <SubmitButtons handleClose={handleClose} isUpdate={!!id} />
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddMenuOffer;
