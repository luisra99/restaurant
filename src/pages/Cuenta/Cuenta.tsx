import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import { People, Add, Remove, Print, Info } from "@mui/icons-material";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { closeAccount, deleteAccount } from "@/services/account";
import { fTime } from "@/_pwa-framework/utils/format-time";
import OpenAccount from "./components/FormularioCuenta";
import { printAccount } from "@/services/printer";
import PaymentModal from "../Payment/PaymentModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const accountTypeIcon: { [key: string]: JSX.Element } = {
    "Cuenta local": (
      <ReceiptLongIcon
        sx={{
          width: "50%",
          height: "auto",
          maxWidth: "none",
          color: "gray",
        }}
      />
    ),
    "Para llevar": (
      <ShoppingCartCheckoutIcon
        sx={{
          width: "50%",
          height: "auto",
          maxWidth: "none",
          color: "gray",
        }}
      />
    ),
    "Cuenta casa": (
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
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={0}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 1 }}>
          {" "}
          <Grid container display={"flex"} justifyContent={"start"}>
            <Grid item xs={6} textAlign={"left"}>
              <Typography variant="h5">{data?.name}</Typography>
              <Typography>
                Depediente: {data?.dependent ?? "Sin asignar"}
              </Typography>
              <Typography>{data.table?.name} </Typography>
            </Grid>

            <Grid item xs={2} textAlign={"left"}>
              <Typography
                display={"inline-flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                Hora: {fTime(data?.created)}
              </Typography>
              <br />
              <Box
                display={"inline-flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <People sx={{ mr: 1 }} /> {data?.people ?? "¿?"}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              {accountTypeIcon[data?.type?.denomination]}
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
                onClick={() => setOpen(true)}
                sx={{ height: "50px", width: "50px" }}
              >
                <EditIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 1 }}>
          <Grid container rowSpacing={1}>
            {data?.orders?.map((order: any, index: number) => (
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
                        setNegative(true);
                        setProduct(order.id);
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
                      onClick={() => {
                        setProduct(order.id);
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
                      onClick={() => deleteOffer(order.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Grid>
                {index !== data?.orders?.length - 1 && (
                  <Grid item xs={12} textAlign="center">
                    <hr />
                  </Grid>
                )}
              </>
            ))}
            {data?.orders?.length === 0 && (
              <Typography variant="body2" textAlign={"center"}>
                No hay productos en la cuenta
              </Typography>
            )}
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
              <b>{data?.totalQuantity}</b>{" "}
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
              ${" "}
              <b style={{ fontWeight: 100 }}>{data?.totalPrice?.toFixed(2)}</b>
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
              ${" "}
              <b style={{ fontWeight: 900 }}>{data?.finalPrice?.toFixed(2)}</b>
            </Typography>
          </Typography>
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
            color={"dimgrey"}
          >
            <Typography textAlign={"center"}>Pagado</Typography>
            <Typography textAlign={"center"} fontSize={25}>
              {" "}
              $ <b style={{ fontWeight: 100 }}>{data?.totalPaid?.toFixed(2)}</b>
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            fontSize={25}
            textTransform={"uppercase"}
          >
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
          </Typography>
          <Typography
            variant="caption"
            fontSize={25}
            textTransform={"uppercase"}
          >
            <Typography textAlign={"center"}>Falta por pagar</Typography>
            <Typography textAlign={"center"} fontSize={25}>
              {" "}
              ${" "}
              <b style={{ fontWeight: 900 }}>
                {(
                  data?.finalPrice?.toFixed(2) - data?.totalPaid?.toFixed(2)
                ).toFixed(2)}
              </b>
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
                    {data?.mappedTaxsDiscounts?.length ? (
                      data?.mappedTaxsDiscounts?.map((tax: any) => (
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
                            <Typography variant="body1">
                              ${tax.amount?.toFixed(2)}
                            </Typography>
                          </Grid>
                        </Fragment>
                      ))
                    ) : (
                      <Grid item>
                        <Typography variant="body1">
                          No hay impuestos ni descuentos aplicados
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* Espacio vacío para mantener la alineación */}
                <Grid item xs={2}></Grid>
              </Grid>
              {/* Botón de Settings fijado en la esquina inferior derecha */}
              {data?.mappedTaxsDiscounts?.length ? (
                <Button
                  size="large"
                  variant="contained"
                  color="warning"
                  sx={{
                    position: "absolute",
                    bottom: 0, // Ajusta este valor según sea necesario
                    right: 0, // Ajusta este valor según sea necesario
                    top: 0,
                    height: "100%",
                    width: "50px",
                    borderRadius: "8px 8px 8px 8px",
                  }}
                  onClick={() =>
                    axios
                      .delete(`/api/accounts/tax/${data.id}`)
                      .then(() => load())
                  }
                >
                  <Remove />
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  color="warning"
                  sx={{
                    position: "absolute",
                    bottom: 0, // Ajusta este valor según sea necesario
                    right: 0, // Ajusta este valor según sea necesario
                    top: 0,
                    height: "100%",
                    width: "50px",
                    borderRadius: "8px 8px 8px 8px",
                  }}
                  onClick={() =>
                    axios
                      .post(`/api/accounts/tax/${data.id}`)
                      .then(() => load())
                  }
                >
                  <Add />
                </Button>
              )}
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
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 2 }}
              onClick={() =>
                deleteAccount(data.id).then(() => navegar("/mesas"))
              }
            >
              <Typography variant="subtitle1" letterSpacing={0.7}>
                Eliminar
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              sx={{ py: 2 }}
              onClick={() => printAccount(data.id)}
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
              onClick={() =>
                closeAccount(data.id).then(() => navegar("/mesas"))
              }
            >
              <Typography variant="subtitle1" letterSpacing={0.7}>
                Cerrar
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
                {data?.name}
                {data?.people &&
                  ` - ${data?.people > 1 ? "personas" : "persona"}`}
                {}
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          width={"100%"}
          mt={1}
          justifyContent={"space-evenly"}
        >
          {data.divisaAmount?.map((currency: any) => (
            <Grid item xs={3}>
              <Paper
                key={currency.denomination}
                elevation={3}
                sx={{ padding: 2, borderRadius: "8px", position: "relative" }}
              >
                <Grid item xs={9}>
                  <Typography>{currency.denomination}</Typography>
                </Grid>

                <Grid item xs={3} textAlign={"right"}>
                  <Typography variant="subtitle1">
                    ${currency.amount}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          ))}
          {open && (
            <Modal
              onClose={handleClose}
              open={!!open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <OpenAccount id={data.id} handleClose={handleClose} />
              </Box>
            </Modal>
          )}
        </Grid>
        <PaymentModal
          open={paymentModal}
          onClose={() => {
            load().then(() => setPaymentModal(false));
          }}
          idAccount={data.id}
        />
      </Box>
    </>
  );
}

export default Cuenta;
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
