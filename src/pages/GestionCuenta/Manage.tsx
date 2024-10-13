import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Grid, Modal, Paper, Typography } from "@mui/material";
import Calculator from "@/app/components/calculator/Calc";

import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Cuenta from "../Cuenta/Cuenta";
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
  const [open, setOpen] = useState(false);
  const [ammount, setAmmount] = useState<string>("");

  return (
    <>
      <Meta title="Configuración" />
      <Grid container spacing={2}>
        <Grid item width={"60vw"} position={"fixed"}>
          <Menu setProduct={setOpen} />
        </Grid>
        <Grid item ml={"60vw"}>
          <Cuenta />
        </Grid>
      </Grid>
      <Modal
        open={!!open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Calculator
            result={ammount}
            setResult={setAmmount}
            submit={() => {
              setOpen(false);
              console.log(ammount);
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Manage;
