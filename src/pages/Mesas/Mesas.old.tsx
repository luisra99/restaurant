import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Button, Grid, Modal, Paper, Typography } from "@mui/material";
import Calculator from "@/app/components/calculator/Calc";
import { Person, Timelapse } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
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
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  function handleClose(): void {
    setOpen(false);
  }
  const mesas: any = [
    { name: "Mesa 1", orders: 1, amount: 56.87, status: "libre" },
    {
      name: "Mesa 2",
      orders: 2,
      amount: 56.87,
      status: "ocupada",
      personas: 2,
    },
    {
      name: "Mesa 3",
      orders: 2,
      amount: 56.87,
      status: "reservada",
      personas: 4,
    },
    {
      name: "Mesa 4",
      orders: 2,
      amount: 56.87,
      status: "esperando_pedido",
      personas: 2,
    },
    {
      name: "Mesa 5",
      orders: 2,
      amount: 56.87,
      status: "esperando_cuenta",
      personas: 2,
    },
    { name: "Mesa 6", orders: 2, amount: 56.87 },
    { name: "Mesa 7", orders: 2, amount: 56.87 },
    { name: "Mesa 8", orders: 2, amount: 56.87 },
    { name: "Mesa 9", orders: 2, amount: 56.87 },
    { name: "Mesa 10", orders: 2, amount: 56.87 },
    { name: "Mesa 11", orders: 2, amount: 56.87 },
    { name: "Mesa 12", orders: 2, amount: 56.87 },
    { name: "Mesa 13", orders: 2, amount: 56.87 },
    { name: "Mesa 14", orders: 2, amount: 56.87 },
    { name: "Mesa 15", orders: 2, amount: 56.87 },
    { name: "Mesa 16", orders: 2, amount: 56.87 },
    { name: "Mesa 17", orders: 2, amount: 56.87 },
    { name: "Mesa 18", orders: 2, amount: 56.87 },
    { name: "Mesa 19", orders: 2, amount: 56.87 },
    { name: "Mesa 20", orders: 2, amount: 56.87 },
    { name: "Mesa 21", orders: 2, amount: 56.87 },
    { name: "Mesa 22", orders: 2, amount: 56.87 },
    { name: "Mesa 23", orders: 2, amount: 56.87 },
    { name: "Mesa 24", orders: 2, amount: 56.87 },
    { name: "Mesa 25", orders: 2, amount: 56.87 },
    { name: "Mesa 26", orders: 2, amount: 56.87 },
    { name: "Mesa 27", orders: 2, amount: 56.87 },
    { name: "Mesa 28", orders: 2, amount: 56.87 },
    { name: "Mesa 29", orders: 2, amount: 56.87 },
    { name: "Mesa 30", orders: 2, amount: 56.87 },
  ];
  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={4}>
        <Grid container spacing={4}>
          {mesas.map((mesa: any) => (
            <Grid item xs={12} sm={4} md={2} key={mesa.name}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "8px",
                  backgroundColor:
                    mesa.status === "libre"
                      ? "lightgreen"
                      : mesa.status === "ocupada"
                        ? "lightcoral"
                        : mesa.status === "reservada"
                          ? "lightyellow"
                          : mesa.status === "esperando_pedido"
                            ? "orange"
                            : mesa.status === "esperando_cuenta"
                              ? "lightblue"
                              : "lightgray",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => setOpen(true)}
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
                  {!!mesa.personas && (
                    <Box display="flex" alignItems="center">
                      <Person fontSize="small" sx={{ marginRight: 0.5 }} />
                      <Typography variant="body2" color="textSecondary">
                        {mesa.personas}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Monto total y tiempo de ocupación */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginTop: 0.5 }}
                >
                  {/* Monto total de la cuenta */}
                  <Typography variant="caption" color="textSecondary">
                    ${mesa.amount}
                  </Typography>

                  {/* Tiempo de ocupación */}
                  {mesa.status !== "libre" && (
                    <Box display="flex" alignItems="center">
                      <Timelapse fontSize="small" sx={{ marginRight: 0.5 }} />
                      <Typography variant="caption" color="textSecondary">
                        {mesa.tiempoOcupacion} minutos
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Productos en la mesa */}
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {mesa.orders} {mesa.orders > 1 ? "productos" : "producto"}
                </Typography>

                {/* Mesero asignado */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 0.5 }}
                >
                  Mesero: {mesa.mesero || "No asignado"}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
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
            {/* Botón para abrir cuenta normal */}
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

            {/* Botón para cuenta de pedidos para llevar */}
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

            {/* Botón para cuenta de servicio a domicilio */}
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

export default Mesas;
