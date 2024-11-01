import { Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface AccountStatisticProps {
  totalQuantity: number;
  totalPrice: any;
  finalPrice: any;
}

const AccountStatistic: FunctionComponent<AccountStatisticProps> = ({
  totalPrice,
  totalQuantity,
  finalPrice,
}) => {
  return (
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
      <Typography variant="caption" fontSize={25} textTransform={"uppercase"}>
        <Typography>Productos</Typography>
        <Typography fontSize={25} textAlign={"center"}>
          <b>{totalQuantity}</b>{" "}
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
          $ <b style={{ fontWeight: 100 }}>{totalPrice?.toFixed(2)}</b>
        </Typography>
      </Typography>
      <Typography variant="caption" fontSize={25} textTransform={"uppercase"}>
        <Typography textAlign={"center"}> A pagar</Typography>
        <Typography textAlign={"center"} fontSize={25}>
          {" "}
          $ <b style={{ fontWeight: 900 }}>{finalPrice?.toFixed(2)}</b>
        </Typography>
      </Typography>
    </Paper>
  );
};

export default AccountStatistic;
