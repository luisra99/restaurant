import { Box } from "@mui/system";
import Meta from "@/base/components/Meta";
import { Grid, Paper, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAccounts } from "@/services/account";
import { useNavigate } from "react-router-dom";

function Cuentas() {
  const [open, setOpen] = useState(false);
  const [cuentas, setCuentas] = useState<any[]>([]);
  function handleClose(): void {
    setOpen(false);
  }
  const navegar = useNavigate();
  const Load = async () => {
    const _concepts = await getAccounts();
    setCuentas([..._concepts]);
  };
  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent="center" width="100%" p={4}>
        <Grid container spacing={4}>
          {cuentas?.map((cuenta: any) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={cuenta.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "8px",
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => navegar(`/manage?id=${cuenta.id}`)}
              >
                {/* Contenedor principal con el nombre de la mesa y la cantidad de personas */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Nombre de la mesa */}
                  <Typography variant="h6">
                    {cuenta.name ? cuenta.name : cuenta.table?.name}
                  </Typography>

                  {/* Cantidad de personas */}
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                      {cuenta.table && `${cuenta.table?.name} -`}{" "}
                      {`${cuenta.people ?? "¿?"}`}
                      {cuenta.table && `/${cuenta.table.capacity}`}
                    </Typography>
                    <Person fontSize="small" sx={{ marginRight: 0.5 }} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Cuentas;
