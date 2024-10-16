import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  People,
  CalendarToday,
  AccessTime,
  RoomService,
  Add,
  Remove,
  Settings,
  Print,
  Info,
} from "@mui/icons-material";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getAccount, getAccounts } from "@/services/account";
import { fTime } from "@/_pwa-framework/utils/format-time";
function Cuenta() {
  const accountTypeIcon: { [key: number]: JSX.Element } = {
    13: (
      <ReceiptLongIcon
        sx={{
          width: "50%",
          height: "auto",
          maxWidth: "none",
          color: "gray",
        }}
      />
    ),
    14: (
      <ShoppingCartCheckoutIcon
        sx={{
          width: "50%",
          height: "auto",
          maxWidth: "none",
          color: "gray",
        }}
      />
    ),
    15: (
      <HomeIcon
        sx={{
          width: "50%",
          height: "auto",
          maxWidth: "none",
          color: "gray",
        }}
      />
    ),
  };
  const [cuenta, setCuenta] = useState<any>([]);
  const Load = async () => {
    const cuenta = await getAccount(1);
    setCuenta(cuenta);
  };
  useEffect(() => {
    Load();
  }, []);
  const cuenta2 = {
    table: "Mesa 14",
    location: "Terraza",
    people: 3,
    initDate: "4/23/23",
    initTime: "16:04",
    dependent: "Adriana",
    orders: [
      { count: 3, product: "Manjar de quesos y embutidos", price: "12,500.00" },
      {
        count: 2,
        product: "Ensalada de Vegetales de Estación",
        price: "250.00",
      },
      { count: 3, product: "Manjar de quesos y embutidos", price: "12,500.00" },
      {
        count: 2,
        product: "Ensalada de Vegetales de Estación",
        price: "1,000.00",
      },
      { count: 3, product: "Manjar de quesos y embutidos", price: "12,500.00" },
      { count: 2, product: "Jugo natural", price: "1,000.00" },
      { count: 3, product: "Arroz frito", price: "2,000.00" },
      { count: 2, product: "Jugo natural", price: "1,000.00" },
    ],
    subTotal: "121,500.00",
    taxes: [
      { name: "Servicio", percent: 10, amount: "120,500.00" },
      { name: "Cumpleaños", percent: 19, amount: "102,500.00" },
    ],
    discounts: [{ name: "Dia del amor", percent: 5, amount: "102,500.00" }],
    productsCount: 4,
    toPay: "123,500.00",
    currency: [
      { name: "USD", amount: "33.40" },
      { name: "EUR", amount: "30.25" },
    ],
  };
  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={0}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 1 }}>
          {" "}
          <Grid container display={"flex"} justifyContent={"start"}>
            <Grid item xs={6} textAlign={"left"}>
              <Typography variant="h5">{cuenta?.name}</Typography>
              <Typography>Depediente: {cuenta?.idDependent}</Typography>
            </Grid>

            <Grid item xs={2} textAlign={"left"}>
              <Typography
                display={"inline-flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <AccessTime sx={{ mr: 1 }} /> {fTime(cuenta?.created)}
              </Typography>
              <br />
              <Box
                display={"inline-flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <People sx={{ mr: 1 }} /> {cuenta?.people ?? "¿?"}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              {accountTypeIcon[cuenta?.idType]}
            </Grid>

            <Grid
              item
              xs={2}
              display={"flex"}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                size="large"
                variant="contained"
                color="info"
                sx={{ height: "50px", width: "50px" }}
              >
                <EditIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 1 }}>
          <Grid container rowSpacing={1}>
            {cuenta?.orders?.map((order: any, index: number) => (
              <>
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {order.name}
                  </Typography>
                  <Typography sx={{ color: "brown" }}>
                    ${order.totalPrice}
                  </Typography>
                </Grid>

                <Grid item xs={6} textAlign="right">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      sx={{
                        backgroundColor: "#f0f0f0",
                        marginRight: 1,
                        height: "50px",
                        width: "50px",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                      onClick={() => {
                        console.log(order.id);
                      }}
                    >
                      <Remove />
                    </IconButton>

                    <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                      {order.quantity}
                    </Typography>

                    <IconButton
                      sx={{
                        backgroundColor: "#f0f0f0",
                        marginLeft: 1,
                        height: "50px",
                        width: "50px",

                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: "#f0f0f0",
                        marginLeft: 3,
                        height: "50px",
                        width: "50px",

                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Grid>
                {index !== cuenta?.orders.length - 1 && (
                  <Grid item xs={12} textAlign="center">
                    <hr />
                  </Grid>
                )}
              </>
            ))}
          </Grid>
        </Paper>
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
          >
            <Typography>Productos</Typography>
            <Typography fontSize={25} textAlign={"center"}>
              <b>{cuenta?.totalQuantity}</b>{" "}
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            fontSize={25}
            textTransform={"uppercase"}
            color={"dimgrey"}
          >
            <Typography textAlign={"center"}>SubTotal</Typography>
            <Typography textAlign={"center"} fontSize={25}>
              {" "}
              $ <b style={{ fontWeight: 100 }}>{cuenta?.totalPrice}</b>
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            fontSize={25}
            textTransform={"uppercase"}
          >
            <Typography textAlign={"center"}> A pagar</Typography>
            <Typography textAlign={"center"} fontSize={25}>
              {" "}
              $ <b style={{ fontWeight: 900 }}>{cuenta?.finalPrice}</b>
            </Typography>
          </Typography>
        </Paper>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{ padding: 2, borderRadius: "8px", position: "relative" }}
            >
              <Grid container spacing={1} justifyContent={"space-between"}>
                <Grid item xs={10}>
                  <Grid container>
                    {cuenta?.mappedTaxsDiscounts?.map((tax: any) => (
                      <Fragment key={tax.name}>
                        <Grid item xs={9}>
                          <Typography variant="body1">
                            {tax.name}{" "}
                            <b>
                              ({tax.tax ? "+" : "-"}
                              {tax.percent}%)
                            </b>
                          </Typography>
                        </Grid>

                        <Grid item xs={3} textAlign={"right"}>
                          <Typography variant="body1">${tax.amount}</Typography>
                        </Grid>
                      </Fragment>
                    ))}
                  </Grid>
                </Grid>
                {/* Espacio vacío para mantener la alineación */}
                <Grid item xs={2}></Grid>
              </Grid>

              {/* Botón de Settings fijado en la esquina inferior derecha */}
              <Button
                size="large"
                variant="contained"
                color="info"
                sx={{
                  position: "absolute",
                  bottom: 0, // Ajusta este valor según sea necesario
                  right: 0, // Ajusta este valor según sea necesario
                  top: 0,
                  height: "100%",
                  width: "50px",
                  borderRadius: "8px 8px 8px 8px",
                }}
              >
                <Settings />
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          mt={2}
          spacing={1}
        >
          <Grid item xs={3}>
            <Button variant="contained" color="error" fullWidth sx={{ py: 2 }}>
              <Typography variant="subtitle1" letterSpacing={0.7}>
                Eliminar
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" color="info" fullWidth sx={{ py: 2 }}>
              <Print sx={{ mr: 1 }} />{" "}
              <Typography variant="subtitle1" letterSpacing={0.7}>
                Imprimir recibo
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ py: 2 }}
            >
              <Typography variant="subtitle1" letterSpacing={0.7}>
                Cerrar Cuenta
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Info sx={{ mr: 1, color: "gray", fontSize: "20px" }} />
            <Typography variant="overline" letterSpacing={1} color={"gray"}>
              <i>
                {cuenta?.name} - {cuenta?.people}{" "}
                {cuenta?.people > 1 ? "personas" : "persona"}
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} width={"100%"} mt={1}>
          {/* {cuenta.currency.map((currency: any) => (
            <Grid item xs={3}>
              <Paper
                key={currency.name}
                elevation={3}
                sx={{ padding: 2, borderRadius: "8px", position: "relative" }}
              >
                <Grid item xs={9}>
                  <Typography>{currency.name}</Typography>
                </Grid>

                <Grid item xs={3} textAlign={"right"}>
                  <Typography variant="subtitle1">
                    ${currency.amount}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </>
  );
}

export default Cuenta;
