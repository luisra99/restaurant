import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { pay } from "@/services/payments";
import { notify } from "@/base/utils/notify";
import { getConcepts } from "@/services/concept";

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  idAccount: string;
}

interface Divisa {
  id: string;
  denomination: string;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0.01, "Debe ser mayor que 0")
    .required("Cantidad es requerida"),
  idMethod: Yup.string().required("Método de pago es requerido"),
  idDivisa: Yup.string().nullable(),
});

const PaymentModal: React.FC<PaymentFormProps> = ({
  open,
  onClose,
  idAccount,
}) => {
  const [divisas, setDivisas] = useState<Divisa[]>([]);
  const [initialValues, setInitialValues] = useState<any>({
    amount: "",
    idMethod: "", // Efectivo por defecto
    idDivisa: null,
  });
  const [tiposPago, setTiposPago] = useState<any[]>([]);

  useEffect(() => {
    // Llamada para obtener las divisas desde el backend
    const fetchDivisas = async () => {
      try {
        const divisasConcept = await getConcepts("Divisas");
        setDivisas(divisasConcept);
        const tiposPagoConcept = await getConcepts("Tipos de pago");
        const efectivoConcept = tiposPagoConcept.find(
          (concept: any) => concept.denomination == "Efectivo"
        );
        setInitialValues({
          amount: "",
          idMethod: efectivoConcept.id, // Efectivo por defecto
          idDivisa: null,
        });
        setTiposPago(tiposPagoConcept);
      } catch (error) {
        console.error("Error consumiendo servicio", error);
      }
    };
    fetchDivisas();
  }, []);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      // Aquí puedes hacer la llamada a tu API para registrar el pago
      await pay({ ...values, idAccount });
      resetForm();
      onClose();
    } catch (error) {
      notify("Falló el pago", "error");
      console.error("Error consumiendo servicio", error);
      throw new Error("Error consumiendo servicio");
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
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
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

              <Typography variant="subtitle1">Método de Pago</Typography>
              <RadioGroup
                name="idMethod"
                value={values.idMethod}
                onChange={handleChange}
              >
                {tiposPago?.map((tipoPago: any) => (
                  <FormControlLabel
                    value={tipoPago.id}
                    control={<Radio />}
                    label={tipoPago.denomination}
                  />
                ))}
              </RadioGroup>

              <FormControl fullWidth>
                <InputLabel id="currency-label">Divisa (Opcional)</InputLabel>
                <Select
                  labelId="currency-label"
                  name="idDivisa"
                  label="Divisa (Opcional)"
                  value={values.idDivisa}
                  onChange={handleChange}
                  error={touched.idDivisa && Boolean(errors.idDivisa)}
                >
                  {divisas?.map((divisa) => (
                    <MenuItem key={divisa.id} value={divisa.id}>
                      {divisa.denomination}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Pagar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
