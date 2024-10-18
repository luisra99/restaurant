import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Grid, Modal, Paper, Typography } from "@mui/material";
import Calculator from "@/app/components/calculator/Calc";

import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Cuenta from "../Cuenta/Cuenta";
import {
  deleteAccountDetails,
  getAccount,
  modifyAccountDetails,
} from "@/services/account";
import { useSearchParams } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Manage() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState<number | null>(null);
  const [idAccount, setAccount] = useState<number>(1);
  const [quantity, setQuantity] = useState<string>("");
  const [negative, setNegative] = useState<boolean>(false);
  const [cuenta, setCuenta] = useState<any>({});
  function handleClose(): void {
    setOpen(null);
  }
  const deleteOffer = (idOffer: number) => {
    deleteAccountDetails({ idAccount, idOffer }).then(() => Load());
  };

  const Load = async () => {
    const id = Number(searchParams.get("id"));
    if (typeof id == "number") {
      setAccount(id);
      const cuenta = await getAccount(id);
      setCuenta({ ...cuenta });
    }
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <Meta title="Configuración" />
      <Grid container spacing={2}>
        <Grid item width={"60vw"} position={"fixed"}>
          <Menu setProduct={setOpen} />
        </Grid>
        <Grid item ml={"60vw"}>
          <Cuenta
            setProduct={setOpen}
            setNegative={setNegative}
            deleteOffer={deleteOffer}
            data={cuenta}
          />
        </Grid>
      </Grid>
      <Modal
        open={!!open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Calculator
            result={quantity}
            setResult={setQuantity}
            submit={() => {
              modifyAccountDetails({
                idAccount,
                quantity: Number(quantity),
                negative,
                idOffer: open,
              }).then(() => Load());
              setNegative(false);
              setOpen(null);
              setQuantity("");
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Manage;
