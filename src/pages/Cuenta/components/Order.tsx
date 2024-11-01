import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface OrderProps {
  order: any;
  setNegative: any;
  setProduct: any;
  deleteOffer: any;
  last: boolean;
}

const Order: FunctionComponent<OrderProps> = ({
  order,
  setNegative,
  setProduct,
  deleteOffer,
  last,
}) => {
  return (
    <>
      <Grid item xs={6}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {order.name}
        </Typography>
        <Typography sx={{ color: "brown" }}>${order.totalPrice}</Typography>
      </Grid>

      <Grid item xs={6} textAlign="right">
        <Box display="flex" alignItems="center" justifyContent="flex-end">
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
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
      {last && (
        <Grid item xs={12} textAlign="center">
          <hr />
        </Grid>
      )}
    </>
  );
};

export default Order;
