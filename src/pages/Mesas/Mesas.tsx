import { Box } from "@mui/system";
import Meta from "@/base/components/Meta";
import { Dialog, Grid, Paper, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { listTables } from "@/services/table";
import { fToNow } from "@/base/utils/format-time";
import { getAccounts } from "@/services/account";
import OpenAccount from "../../components/revisar/FormularioCuenta";
import { useNavigate } from "react-router-dom";
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

function Mesas() {
  const [openAccount, setOpenAccount] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [mesas, setMesas] = useState<any[]>([]);
  const navegar = useNavigate();
  function handleClose(): void {
    setOpenAccount(false);
    Load();
  }
  const Load = async () => {
    const _concepts = await listTables();
    getAccounts();
    setMesas([..._concepts]);
  };
  const statusColors: { [key: number]: string } = {
    0: "lightgreen",
    1: "lightcoral",
    2: "lightyellow",
    3: "orange",
    4: "lightblue",
  };
  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={4}>
        <Grid container spacing={4}>
          {mesas?.map((mesa: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mesa.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "8px",
                  backgroundColor: mesa.Account ? "lightgreen" : "lightgray",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() =>
                  mesa.Account
                    ? navegar(`/manage?id=${mesa.Account.id}`)
                    : setOpenAccount(mesa.id)
                }
              >
                {/* Contenedor principal con el nombre de la mesa y la cantidad de personas */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Nombre de la mesa */}
                  <Typography variant="h6">{mesa.name}</Typography>

                  {/* Cantidad de personas */}
                  <Box display="flex" alignItems="center">
                    <Person fontSize="small" sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2" color="textSecondary">
                      {mesa.Account && `${mesa.Account.people ?? "¿?"}/`}
                      {mesa.capacity}
                    </Typography>
                  </Box>
                </Box>

                {/* Muestra los detalles de la mesa si no hay una cuenta abierta */}
                {!mesa.Account && (
                  <Box alignItems="left">
                    <Typography variant="body2" color="textSecondary">
                      {mesa.details}
                    </Typography>
                  </Box>
                )}
                {/* Monto total y tiempo de ocupación */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginTop: 0.5 }}
                >
                  {/* Monto total de la cuenta */}
                  {mesa.Account && (
                    <Typography
                      variant="caption"
                      fontSize={"15px"}
                      color="textSecondary"
                    >
                      {mesa.Account._count.details}{" "}
                      {mesa.Account._count.details > 1
                        ? "productos"
                        : "producto"}{" "}
                      - ${mesa.amount}
                    </Typography>
                  )}
                </Box>

                {/* Productos en la mesa */}
                {mesa.Account && (
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 1 }}
                  ></Typography>
                )}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginTop: 0.5 }}
                >
                  {/* Tiempo de ocupación */}
                  {mesa.Account && (
                    <Box display="flex" alignItems="center">
                      <Typography variant="caption" color="textSecondary">
                        {fToNow(mesa.Account.created)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {/* Mesero asignado */}
                {mesa.Account && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 0.5 }}
                  >
                    Mesero: {mesa.Account?.dependent?.name || "No asignado"}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog fullScreen onClose={handleClose} open={!!openAccount}>
        <OpenAccount idTable={openAccount} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default Mesas;
