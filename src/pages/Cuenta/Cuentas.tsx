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
            <Grid item xs={12} sm={6} md={4} xl={3} key={cuenta.name}>
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
                  <Typography variant="h6">
                    {cuenta.name ? cuenta.name : cuenta.table.name}
                  </Typography>

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
    </>
  );
}

export default Cuentas;
