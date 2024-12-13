import { Box } from "@mui/system";
import Meta from "@/base/components/Meta";
import { Dialog, Divider, Grid, Paper, Typography } from "@mui/material";
import { Bolt, Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { listTables } from "@/services/table";
import { fToNow } from "@/base/utils/format-time";
import OpenAccount from "../../components/revisar/FormularioCuenta";
import { useNavigate } from "react-router-dom";
import { createAccount } from "@/services/account";

function Mesas() {
  const [openAccount, setOpenAccount] = useState(false);
  const [mesasGrouped, setMesasGrouped] = useState<{ [key: string]: any[] }>(
    {}
  );
  const navegar = useNavigate();

  function handleClose(): void {
    setOpenAccount(false);
    Load();
  }

  const Load = async () => {
    const groupedTables = await listTables();
    setMesasGrouped(groupedTables);
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <Meta title="Configuración" />
      <Grid container justifyContent="center" spacing={2} padding={2}>
        {Object.keys(mesasGrouped).map((detail) => (
          <Grid item key={detail} mb={2} xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="h5" gutterBottom>
              {detail}
            </Typography>
            <Divider sx={{ mb: 2 }} /> {/* Línea separadora */}
            <Grid container spacing={1}>
              {mesasGrouped[detail].map((mesa: any) => (
                <Grid item xs={6} sm={6} md={6} lg={12} xl={12} key={mesa.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 1,
                      borderRadius: "8px",
                      backgroundColor: mesa.Account
                        ? "lightgreen"
                        : "lightgray",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={(e: any) => {
                      if (e.target.id !== "bolt") {
                        mesa.Account
                          ? navegar(`/manage?id=${mesa.Account.id}`)
                          : setOpenAccount(mesa.id);
                      }
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        flexGrow={1}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h6" flexGrow={1}>
                          {mesa.name}
                        </Typography>
                        <Person fontSize="small" sx={{ marginRight: 0.5 }} />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginRight: 1 }}
                        >
                          {mesa.Account && `${mesa.Account.people ?? "¿?"}/`}
                          {mesa.capacity}
                        </Typography>
                      </Box>
                      {!mesa.Account && (
                        <Bolt
                          id="bolt"
                          sx={{
                            backgroundColor: "darkorange",
                            color: "white",
                            borderRadius: 50,
                            fontSize: "35px",
                          }}
                          onClick={() =>
                            createAccount({
                              idTable: mesa.id,
                              name: "",
                            }).then((data) => {
                              navegar(`/manage?id=${data.id}`);
                            })
                          }
                        />
                      )}
                    </Box>

                    {mesa.Account && (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          fontSize={"15px"}
                          color="textSecondary"
                        >
                          {mesa.Account._count.details}{" "}
                          {mesa.Account._count.details > 1
                            ? "productos"
                            : "producto"}{" "}
                          - ${mesa.amount}
                        </Typography>
                      </Box>
                    )}
                    {mesa.Account && (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center">
                          <Typography variant="caption" color="textSecondary">
                            {fToNow(mesa.Account.created)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {mesa.Account && (
                      <Typography variant="body2" color="textSecondary">
                        Mesero: {mesa.Account?.dependent?.name || "No asignado"}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Dialog fullScreen onClose={handleClose} open={!!openAccount}>
        <OpenAccount idTable={openAccount} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default Mesas;
