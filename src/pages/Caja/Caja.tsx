import { Box, Button, Grid, Paper } from "@mui/material";
import InitialCash from "./components/InitialCash";
import axios from "axios";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Grid container spacing={0}>
        <Grid item xs={4} md={4}>
          <Paper>
            <InitialCash />
          </Paper>
        </Grid>
        <Grid item xs={4} md={4} p={3}>
          <Button
            variant={"contained"}
            sx={{ height: "100%" }}
            fullWidth
            onClick={() => axios.get("/api/printer/today")}
          >
            Venta de área
          </Button>
          <Grid />
        </Grid>
        <Grid item xs={3} md={4} p={3}>
          <Button
            variant={"contained"}
            sx={{ height: "100%" }}
            fullWidth
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
