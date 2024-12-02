import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Order from "./Order2";

interface OrdersListProps {
  setNegative: any;
  setProduct: any;
  deleteOffer: any;
  idAccount: any;
  orders: any[];
  loadAccountData: any;
}

const OrdersList: FunctionComponent<OrdersListProps> = ({
  deleteOffer,
  setNegative,
  setProduct,
  idAccount,
  loadAccountData,
  orders,
}) => {
  return (
    <Grid container rowSpacing={1}>
      {orders?.map((order: any, index: number) => (
        <Order
          order={order}
          last={index !== orders?.length - 1}
          deleteOffer={deleteOffer}
          setProduct={setProduct}
          setNegative={setNegative}
          idAccount={idAccount}
          loadAccountData={loadAccountData}
          key={index}
        />
      ))}
      {orders?.length === 0 && (
        <Typography variant="body2" textAlign={"center"} pt={1}>
          No hay productos en la cuenta
        </Typography>
      )}
    </Grid>
  );
};

export default OrdersList;
