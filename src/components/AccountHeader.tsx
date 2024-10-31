import React from "react";
import { Paper, Grid, Typography, Button, Box } from "@mui/material";
import { fTime } from "@/base/utils/format-time";
import { People } from "@mui/icons-material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import { iconStyles, paperStyles } from "@/pages/Cuenta/styles";
import { AccountData } from "@/pages/Cuenta/types";
import EditIcon from "@mui/icons-material/Edit";

const accountTypeIcons: { [key: string]: JSX.Element } = {
  "Cuenta local": <ReceiptLongIcon sx={iconStyles} />,
  "Para llevar": <ShoppingCartCheckoutIcon sx={iconStyles} />,
  "Cuenta casa": <HomeIcon sx={iconStyles} />,
};

interface AccountHeaderProps {
  data: AccountData;
  setOpen: (value: boolean) => void;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ data, setOpen }) => (
  <Paper elevation={3} sx={paperStyles}>
    <Grid container display={"flex"} justifyContent={"start"}>
      <Grid item xs={6} textAlign={"left"}>
        <Typography variant="h5">{data?.name}</Typography>
        <Typography>Dependiente: {data?.dependent ?? "Sin asignar"}</Typography>
        <Typography>{data.table?.name}</Typography>
      </Grid>
      <Grid item xs={2} textAlign={"left"}>
        <Typography display={"inline-flex"} alignItems={"center"}>
          Hora: {fTime(data?.created)}
        </Typography>
        <Box display={"inline-flex"} alignItems={"center"}>
          <People sx={{ mr: 1 }} /> {data?.people ?? "¿?"}
        </Box>
      </Grid>
      <Grid item xs={2} textAlign={"center"}>
        {accountTypeIcons[data?.type?.denomination]}
      </Grid>
      <Grid item xs={2} display={"flex"} justifyContent={"center"}>
        <Button
          size="large"
          variant="contained"
          color="info"
          onClick={() => setOpen(true)}
          sx={{ height: "50px", width: "50px" }}
        >
          <EditIcon />
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

export default AccountHeader;
