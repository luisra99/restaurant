import { fTime } from "@/base/utils/format-time";
import { Edit, People } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";

interface AccountInfoProps {
  name: string;
  dependent: string;
  table: any;
  created: any;
  people: any;
  setOpen: any;
  type: any;
}

const accountTypeIcon: { [key: string]: JSX.Element } = {
  "Cuenta local": (
    <ReceiptLongIcon
      sx={{
        width: "50%",
        height: "auto",
        maxWidth: "none",
        color: "gray",
      }}
    />
  ),
  "Para llevar": (
    <ShoppingCartCheckoutIcon
      sx={{
        width: "50%",
        height: "auto",
        maxWidth: "none",
        color: "gray",
      }}
    />
  ),
  "Cuenta casa": (
    <HomeIcon
      sx={{
        width: "50%",
        height: "auto",
        maxWidth: "none",
        color: "gray",
      }}
    />
  ),
};

const AccountInfo: FunctionComponent<AccountInfoProps> = ({
  created,
  dependent,
  name,
  people,
  setOpen,
  table,
  type,
}) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 1 }}>
      {" "}
      <Grid container display={"flex"} justifyContent={"start"}>
        <Grid item xs={6} textAlign={"left"}>
          <Typography variant="h5">{name}</Typography>
          <Typography>Depediente: {dependent ?? "Sin asignar"}</Typography>
          <Typography>{table?.name} </Typography>
        </Grid>

        <Grid item xs={2} textAlign={"left"}>
          <Typography
            display={"inline-flex"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            Hora: {fTime(created)}
          </Typography>
          <br />
          <Box display={"inline-flex"} alignItems={"center"} flexWrap={"wrap"}>
            <People sx={{ mr: 1 }} /> {people ?? "¿?"}
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          {accountTypeIcon[type?.denomination]}
        </Grid>

        <Grid
          item
          xs={2}
          display={"flex"}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            size="large"
            variant="contained"
            color="info"
            onClick={() => setOpen(true)}
            sx={{ height: "50px", width: "50px" }}
          >
            <Edit />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountInfo;
