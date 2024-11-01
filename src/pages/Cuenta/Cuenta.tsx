import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { Print, Delete } from "@mui/icons-material";
import { useState } from "react";
import { closeAccount, deleteAccount } from "@/services/account";
import { printAccount } from "@/services/printer";
import PaymentModal from "../Payment/PaymentModal";
import { useNavigate } from "react-router-dom";
import ModifyAccount from "./components/ModifyAccount";
import DivisaList from "./components/DivisaList";
import InfoLine from "./components/InfoLine";
import Payment from "./components/Payment";
import TaxDiscount from "./components/TaxDiscounts";
import AccountStatistic from "./components/AccountStatistic";
import OrdersList from "./components/OrdersList";
import AccountInfo from "./components/AccountInfo";

function Cuenta({
  data,
  setNegative,
  setProduct,
  deleteOffer,
  load,
}: {
  data: any;
  deleteOffer: (idOffer: number) => void;
  setNegative: (args: boolean) => void;
  setProduct: (args: number) => void;
  load: () => Promise<void>;
}) {
  function handleClosePayment() {
    load().then(() => setPaymentModal(false));
  }
  function handleClose(
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ): void {
    setOpen(false);
    load();
  }
  const [open, setOpen] = useState(false);
  const navegar = useNavigate();
  const [paymentModal, setPaymentModal] = useState(false);
  return (
    <Box justifyContent="center" width="100%" p={0}>
      <AccountInfo
        created={data?.created}
        dependent={data?.dependent}
        name={data?.name}
        people={data?.people}
        setOpen={setOpen}
        table={data?.table}
        type={data?.type}
      />
      <OrdersList
        orders={data?.orders}
        deleteOffer={deleteOffer}
        setProduct={setProduct}
        setNegative={setNegative}
      />
      <AccountStatistic
        finalPrice={data?.finalPrice}
        totalPrice={data?.totalPrice}
        totalQuantity={data?.totalQuantity}
      />
      <Payment
        finalPrice={data?.finalPrice}
        totalPaid={data?.totalPaid}
        setPaymentModal={setPaymentModal}
      />
      <TaxDiscount
        id={data?.id}
        load={load}
        mappedTaxsDiscounts={data?.mappedTaxsDiscounts}
      />

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        mt={2}
        spacing={1}
      >
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ py: 2 }}
            onClick={() =>
              deleteAccount(data?.id).then(() => navegar("/mesas"))
            }
          >
            <Delete />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="info"
            fullWidth
            sx={{ py: 2 }}
            onClick={() => printAccount(data?.id)}
          >
            <Print />
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ py: 2 }}
            onClick={() => closeAccount(data?.id).then(() => navegar("/mesas"))}
          >
            <Typography variant="subtitle1" letterSpacing={0.7}>
              Cerrar
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <InfoLine name={data?.name} people={data?.people} />
      <DivisaList divisaList={data?.divisaAmount} />
      <ModifyAccount handleClose={handleClose} open={open} id={data?.id} />
      <PaymentModal
        open={paymentModal}
        onClose={handleClosePayment}
        idAccount={data?.id}
      />
    </Box>
  );
}

export default Cuenta;
