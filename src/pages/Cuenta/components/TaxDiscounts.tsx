import { Edit } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Fragment, FunctionComponent } from "react";

interface TaxDiscountProps {
  mappedTaxsDiscounts: any[];
  id: string;
  load: any;
  setOpen: any;
}

const TaxDiscount: FunctionComponent<TaxDiscountProps> = ({
  mappedTaxsDiscounts,
  id,
  load,
  setOpen,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, borderRadius: "8px", position: "relative" }}
    >
      <Grid container spacing={1} justifyContent={"space-between"}>
        <Grid item xs={10}>
          <Grid container>
            {mappedTaxsDiscounts?.length ? (
              mappedTaxsDiscounts?.map((tax: any) => (
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
        onClick={() => setOpen(true)}
      >
        <Edit />
      </Button>
    </Paper>
  );
};

export default TaxDiscount;
