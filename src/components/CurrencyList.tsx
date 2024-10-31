import React from "react";
import { Grid, Typography } from "@mui/material";
import { Currency } from "@/pages/Cuenta/types";

interface CurrencyListProps {
  currencyData: Currency[];
}

const CurrencyList: React.FC<CurrencyListProps> = ({ currencyData }) => (
  <Grid container spacing={1} mt={2}>
    {currencyData?.map((currency) => (
      <Grid item xs={4} key={currency.id}>
        <Typography variant="caption">
          {currency.name}: ${currency.amount}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

export default CurrencyList;
