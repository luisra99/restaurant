import React from "react";
import { Paper, Typography } from "@mui/material";
import { summaryPaperStyles } from "@/pages/Cuenta/styles";
import { AccountData } from "@/pages/Cuenta/types";

interface AccountSummaryProps {
  data: AccountData;
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ data }) => (
  <>
    <Paper elevation={3} sx={summaryPaperStyles}>
      <Typography variant="caption" fontSize={25} textTransform={"uppercase"}>
        <Typography>Productos</Typography>
        <Typography fontSize={25} textAlign={"center"}>
          <b>{data?.totalQuantity}</b>
        </Typography>
      </Typography>
      <Typography
        variant="caption"
        fontSize={25}
        textTransform={"uppercase"}
        color={"dimgrey"}
      >
        <Typography textAlign={"center"}>SubTotal</Typography>
        <Typography fontSize={25} textAlign={"center"}>
          <b>${data?.totalAmount?.toFixed(2)}</b>
        </Typography>
      </Typography>
    </Paper>
  </>
);

export default AccountSummary;
