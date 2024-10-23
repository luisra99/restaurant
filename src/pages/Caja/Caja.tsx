import { Box, Button, Grid, Paper } from "@mui/material";
import InitialCash from "./components/InitialCash";
import FinalCash from "./components/FinalCash";
import Operator from "./components/Operator";
import axios from "axios";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={4} md={4}>
          <Paper>
            <InitialCash />
          </Paper>
        </Grid>
        <Grid item xs={4} md={4}>
          <Paper>
            <FinalCash />
          </Paper>
        </Grid>
        <Grid item xs={4} md={4}>
          <Paper>
            <Operator />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            variant={"contained"}
            sx={{ p: 2 }}
            onClick={() => axios.get("/api/printer/today")}
          >
            Venta de área
          </Button>
          <Button
            variant={"contained"}
            sx={{ p: 2, m: 1 }}
            onClick={() => axios.get("/api/printer/inform")}
          >
            Reporte de caja
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
