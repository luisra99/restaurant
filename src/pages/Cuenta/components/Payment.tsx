import PropinaModal from "@/pages/Payment/PropinaModal";
import { Button, Paper, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

interface PaymentProps {
  finalPrice: number;
  totalPaid: number;
  setPaymentModal: any;
  idAccount: string;
}

const Payment: FunctionComponent<PaymentProps> = ({
  finalPrice,
  totalPaid,
  setPaymentModal,
  idAccount,
}) => {
  const [propinaModal, setPropinaModal] = useState(false);
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
        {finalPrice - totalPaid < 0 ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 2 }}
            onClick={() => setPropinaModal(true)}
          >
            <Typography variant="subtitle1" letterSpacing={0.7}>
              Propina
            </Typography>
          </Button>
        ) : (
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
        )}
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
      <PropinaModal
        open={propinaModal}
        onClose={() => {
          setPropinaModal(false);
        }}
        idAccount={idAccount}
        amount={
          finalPrice - totalPaid < 0
            ? Math.abs(finalPrice - totalPaid)
                .toFixed(2)
                .toString()
            : ""
        }
      />
    </Paper>
  );
};

export default Payment;
