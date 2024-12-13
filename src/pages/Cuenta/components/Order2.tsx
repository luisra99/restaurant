import { modifyAccountDetails } from "@/services/account";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface OrderProps {
  order: any;
  setNegative: any;
  setProduct: any;
  deleteOffer: any;
  last: boolean;
  idAccount: any;
  loadAccountData: any;
}

const Order: FunctionComponent<OrderProps> = ({
  order,
  setNegative,
  setProduct,
  deleteOffer,
  last,
  idAccount,
  loadAccountData,
}) => {
  return (
    <>
      <Grid item xs={6} display={"flex"} alignItems={"center"}>
        <Typography
          sx={{
            fontWeight: 500,
            fontStyle: order.marchado ? "italic" : "unset",
            color: order.marchado ? "dimgrey" : "unset",
          }}
        >
          <b style={{ color: "brown" }}>{order.quantity}x</b> {order.name}
        </Typography>
      </Grid>

      <Grid item xs={6} textAlign="right">
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button
            sx={{
              marginRight: 1,
              padding: { sx: "6px !important", md: "9px !important" },
              minWidth: "unset !important",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            color="error"
            variant="outlined"
            onClick={() => deleteOffer(order.id)}
          >
            <Delete />
          </Button>
          <Button
            sx={{
              marginRight: 1,
              padding: { sx: "6px !important", md: "9px !important" },
              minWidth: "unset !important",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            variant="contained"
            color="error"
            onClick={() => {
              modifyAccountDetails({
                idAccount,
                quantity: 1,
                negative: true,
                idOffer: order.id,
              }).then(() => loadAccountData());
            }}
          >
            <Remove />
          </Button>

          <Button
            sx={{
              padding: { sx: "6px !important", md: "9px !important" },
              minWidth: "unset !important",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            variant="contained"
            color="success"
            onClick={() => {
              modifyAccountDetails({
                idAccount,
                quantity: 1,
                negative: false,
                idOffer: order.id,
              }).then(() => loadAccountData());
            }}
          >
            <Add />
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default Order;
