import { Grid, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface DivisaAmountProps {
  currency: any;
}

const DivisaAmount: FunctionComponent<DivisaAmountProps> = ({ currency }) => {
  return (
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
          <Typography variant="subtitle1">${currency.amount}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default DivisaAmount;
