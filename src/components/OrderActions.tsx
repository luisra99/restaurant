import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import { Order } from "@/pages/Cuenta/types";

interface OrderActionsProps {
  order: Order;
  setNegative: (value: boolean) => void;
  setProduct: (id: string) => void;
  deleteOffer: (id: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  setNegative,
  setProduct,
  deleteOffer,
}) => (
  <Box display="flex" alignItems="center" justifyContent="flex-end">
    <IconButton
      sx={actionButtonStyles}
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
    <IconButton sx={actionButtonStyles} onClick={() => setProduct(order.id)}>
      <Add />
    </IconButton>
    <IconButton sx={actionButtonStyles} onClick={() => deleteOffer(order.id)}>
      <Delete color="error" />
    </IconButton>
  </Box>
);

const actionButtonStyles = {
  height: "35px",
  width: "35px",
  marginRight: 1,
};

export default OrderActions;
