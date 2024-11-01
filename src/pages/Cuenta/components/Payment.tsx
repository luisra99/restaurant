import { Button, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PaymentProps {
  finalPrice: number;
  totalPaid: number;
  setPaymentModal: any;
}

const Payment: FunctionComponent<PaymentProps> = ({
  finalPrice,
  totalPaid,
  setPaymentModal,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: "8px",
        mb: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="caption"
        fontSize={25}
        textTransform={"uppercase"}
        color={"dimgrey"}
      >
        <Typography textAlign={"center"}>Pagado</Typography>
        <Typography textAlign={"center"} fontSize={25}>
          {" "}
          $ <b style={{ fontWeight: 100 }}>{totalPaid?.toFixed(2)}</b>
        </Typography>
      </Typography>
      <Typography variant="caption" fontSize={25} textTransform={"uppercase"}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ py: 2 }}
          onClick={() => setPaymentModal(true)}
        >
          <Typography variant="subtitle1" letterSpacing={0.7}>
            Pagar
          </Typography>
        </Button>
      </Typography>
      <Typography variant="caption" fontSize={25} textTransform={"uppercase"}>
        <Typography textAlign={"center"}>
          {`${finalPrice - totalPaid < 0 ? "Devolver" : "Falta por pagar"}`}
        </Typography>
        <Typography textAlign={"center"} fontSize={25}>
          ${" "}
          <b style={{ fontWeight: 900 }}>
            {Math.abs(finalPrice - totalPaid).toFixed(2)}
          </b>
        </Typography>
      </Typography>
    </Paper>
  );
};

export default Payment;
