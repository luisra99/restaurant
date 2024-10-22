import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import InitialCash from "./components/InitialCash";
import FinalCash from "./components/FinalCash";
import Dependent from "./components/Dependent";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <InitialCash />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <FinalCash />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Dependent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
