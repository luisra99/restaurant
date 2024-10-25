import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LoadConcept } from "@/utils/concepts";
import { savePropina } from "@/services/payments";

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
}

interface Divisa {
  id: number;
  denomination: string;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0.01, "Debe ser mayor que 0")
    .required("Cantidad es requerida"),
  idDivisa: Yup.string().nullable(),
});

const PropinaModal: React.FC<PaymentFormProps> = ({ open, onClose }) => {
  const [divisas, setDivisas] = useState<Divisa[]>([]);

  useEffect(() => {
    // Llamada para obtener las divisas desde el backend
    const fetchDivisas = async () => {
      try {
        const divisasConcept = await LoadConcept("Divisas");
        setDivisas(divisasConcept);
      } catch (error) {
        console.error("Error al obtener las divisas:", error);
      }
    };
    fetchDivisas();
  }, []);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      // Aquí puedes hacer la llamada a tu API para registrar el pago
      await savePropina(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Realizar Pago
        </Typography>

        <Formik
          initialValues={{
            amount: "",
            idDivisa: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="amount"
                  label="Cantidad"
                  type="number"
                  fullWidth
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  onChange={handleChange}
                />
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="currency-label">Divisa</InputLabel>
                  <Select
                    labelId="currency-label"
                    name="idDivisa"
                    label="Divisa"
                    value={values.idDivisa}
                    onChange={handleChange}
                    error={touched.idDivisa && Boolean(errors.idDivisa)}
                  >
                    {divisas.map((divisa) => (
                      <MenuItem key={divisa.id} value={divisa.id}>
                        {divisa.denomination}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Guardar propina
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PropinaModal;
