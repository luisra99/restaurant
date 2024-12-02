import { Box, Button, Grid, Paper } from "@mui/material";
import InitialCash from "./components/InitialCash";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [disabledLimpiar, setDisabledLimpiar] = useState(true);
  const navegar = useNavigate();

  return (
    <Box p={3}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Paper>
            <InitialCash />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={6} p={1}>
              <Button
                variant={"contained"}
                fullWidth
                color="info"
                onClick={() => axios.get("/api/printer/today")}
              >
                Venta de área
              </Button>
              <Grid />
            </Grid>
            <Grid item xs={6} p={1}>
              <Button
                variant={"contained"}
                fullWidth
                color="info"
                onClick={() => axios.get("/api/printer/inform")}
              >
                Reporte de caja
              </Button>
            </Grid>
            <Grid item xs={6} p={1}>
              <Button
                variant={"contained"}
                color="warning"
                fullWidth
                onClick={() => navegar(`/config`)}
              >
                Configuración
              </Button>
            </Grid>
            <Grid item xs={6} p={1}>
              <Button
                variant={"contained"}
                color="warning"
                fullWidth
                onClick={() => navegar(`/menu`)}
              >
                Menú
              </Button>
            </Grid>
            <Grid item xs={4} p={1}>
              <Button
                variant={"contained"}
                color="info"
                fullWidth
                onClick={() => axios.post("/api/operator/lastTicket")}
              >
                Imprimir último
              </Button>
            </Grid>
            <Grid item xs={4} p={1}>
              <Button
                variant={"contained"}
                color="error"
                disabled={!disabledLimpiar}
                fullWidth
                onClick={() => setDisabledLimpiar(false)}
              >
                Activar limpiar
              </Button>
            </Grid>
            <Grid item xs={4} p={1}>
              <Button
                variant={"contained"}
                disabled={disabledLimpiar}
                sx={{ height: "100%" }}
                color="error"
                fullWidth
                onClick={() =>
                  axios
                    .post("/api/operator/reset")
                    .then(() => setDisabledLimpiar(true))
                }
              >
                Limpiar registros
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
