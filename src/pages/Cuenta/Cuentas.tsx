import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Button, Grid, Modal, Paper, Typography } from "@mui/material";
import Calculator from "@/app/components/calculator/Calc";
import { Home, Person, Shop, Timelapse } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import { listTables } from "@/services/table";
import axios from "axios";
import { fToNow } from "@/_pwa-framework/utils/format-time";
import { getAccounts } from "@/services/account";
import { RouterLink } from "@/_pwa-framework/routes/components";
import { Link, useNavigate } from "react-router-dom";
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

function Cuentas() {
  const [open, setOpen] = useState(false);
  const [cuentas, setCuentas] = useState<any[]>([]);
  function handleClose(): void {
    setOpen(false);
  }
  const navegar = useNavigate();
  const Load = async () => {
    const _concepts = await getAccounts();
    setCuentas([..._concepts]);
  };
  useEffect(() => {
    Load();
  }, []);
  const accountTypeIcon: { [key: number]: JSX.Element } = {
    13: <ReceiptLongIcon fontSize="small" sx={{ marginRight: 0.5 }} />,
    14: <ShoppingCartCheckoutIcon fontSize="small" sx={{ marginRight: 0.5 }} />,
    15: <HomeIcon fontSize="small" sx={{ marginRight: 0.5 }} />,
  };

  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={4}>
        <Grid container spacing={4}>
          {cuentas.map((cuenta: any) => (
            <Grid item xs={12} sm={4} key={cuenta.name}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "8px",
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => navegar(`/manage?id=${cuenta.id}`)}
              >
                {/* Contenedor principal con el nombre de la mesa y la cantidad de personas */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Nombre de la mesa */}
                  <Typography variant="h6">{cuenta.name}</Typography>

                  {/* Cantidad de personas */}
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                      {cuenta.table && `${cuenta.table.name} -`}{" "}
                      {`${cuenta.people ?? "¿?"}`}
                      {cuenta.table && `/${cuenta.table.capacity}`}
                    </Typography>
                    <Person fontSize="small" sx={{ marginRight: 0.5 }} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ flexDirection: "column", padding: 2, m: 0.5 }}
              onClick={() => {
                setOpen(false);
                /* Acción para abrir cuenta normal */
              }}
            >
              <ReceiptLongIcon sx={{ fontSize: 50 }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Cuenta local
              </Typography>
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{ flexDirection: "column", padding: 2, m: 0.5 }}
              onClick={() => {
                setOpen(false);

                /* Acción para pedidos para llevar */
              }}
            >
              <ShoppingCartCheckoutIcon sx={{ fontSize: 50 }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Para Llevar
              </Typography>
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{ flexDirection: "column", padding: 2, m: 0.5 }}
              onClick={() => {
                setOpen(false);

                /* Acción para servicio a domicilio */
              }}
            >
              <HomeIcon sx={{ fontSize: 50 }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Cuenta casa
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Cuentas;
