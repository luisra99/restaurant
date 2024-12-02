import { Box } from "@mui/system";
import { useState } from "react";
import PaymentModal from "../Payment/PaymentModal";
import ModifyAccount from "./components/ModifyAccount";
import OrdersList from "./components/OrdersList";
import TaxesManage from "./components/TaxesManage";

function Cuenta({
  data,
  setNegative,
  setProduct,
  deleteOffer,
  load,
  setCuenta,
}: {
  data: any;
  deleteOffer: (idOffer: string) => void;
  setNegative: (args: boolean) => void;
  setProduct: (args: string) => void;
  load: () => Promise<void>;
  setCuenta: (args: any) => Promise<void>;
}) {
  function handleClosePayment() {
    load().then(() => setPaymentModal(false));
  }
  function handleClose(account: any): void {
    setOpen(false);
    setOpenTaxes(false);
    if (account) setCuenta(account);
  }
  const [open, setOpen] = useState(false);
  const [openTaxes, setOpenTaxes] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  return (
    <Box justifyContent="center" width="100%" p={0}>
      <OrdersList
        orders={data?.orders}
        deleteOffer={deleteOffer}
        setProduct={setProduct}
        setNegative={setNegative}
      />

      <ModifyAccount handleClose={handleClose} open={open} id={data?.id} />
      <TaxesManage
        handleClose={handleClose}
        open={openTaxes}
        idAccount={data?.id}
        initialValue={data?.taxDiscount}
      />
      <PaymentModal
        open={paymentModal}
        onClose={handleClosePayment}
        idAccount={data?.id}
      />
    </Box>
  );
}

export default Cuenta;
