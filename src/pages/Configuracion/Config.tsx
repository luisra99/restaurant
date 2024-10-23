import { Box, Grid, Paper } from "@mui/material";
import Mesas from "./Mesas";
import Categorias from "./Categorias";
import Dependientes from "./Dependientes";
import Divisas from "./Divisas";
import ImpuestosDescuentos from "./Impuestos";
import Areas from "./Areas";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Mesas />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Categorias />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Areas />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <ImpuestosDescuentos />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Dependientes />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Divisas />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
