import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { paperStyles } from "@/pages/Cuenta/styles";
import { AccountData } from "@/pages/Cuenta/types";

interface TaxDiscountsSectionProps {
  data: AccountData;
  load: () => void;
}

const TaxDiscountsSection: React.FC<TaxDiscountsSectionProps> = ({
  data,
  load,
}) => (
  <Paper elevation={3} sx={paperStyles}>
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Grid container>
          {data?.mappedTaxsDiscounts?.length ? (
            data.mappedTaxsDiscounts.map((tax) => (
              <Grid item xs={6} key={tax.id}>
                <Typography variant="body2">
                  {tax.name}: ${tax.amount.toFixed(2)}
                </Typography>
              </Grid>
            ))
          ) : (
            <Typography variant="body2">
              No hay descuentos o impuestos
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign="right">
          {data?.mappedTaxsDiscounts
            ?.reduce((acc, tax) => acc + tax.amount, 0)
            ?.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default TaxDiscountsSection;
