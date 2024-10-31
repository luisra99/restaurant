import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Info, Delete, Print } from "@mui/icons-material";
import { AccountData } from "@/pages/Cuenta/types";

interface AccountActionsProps {
  data: AccountData;
  deleteAccount: (id: string) => void;
  closeAccount: (id: string) => void;
  printAccount: (data: AccountData) => void;
  setPaymentModal: (value: boolean) => void;
  navigate: (path: string) => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({
  data,
  deleteAccount,
  closeAccount,
  printAccount,
  setPaymentModal,
  navigate,
}) => (
  <Box display="flex" justifyContent="space-around" mt={2}>
    <IconButton onClick={() => navigate("/accounts")}>
      <Info sx={{ color: "gray" }} />
    </IconButton>
    <IconButton onClick={() => deleteAccount(data.id)}>
      <Delete sx={{ color: "red" }} />
    </IconButton>
    <IconButton onClick={() => closeAccount(data.id)}>
      <Typography>Cerrar Cuenta</Typography>
    </IconButton>
    <IconButton onClick={() => printAccount(data)}>
      <Print sx={{ color: "green" }} />
    </IconButton>
    <Button variant="contained" onClick={() => setPaymentModal(true)}>
      Pagar
    </Button>
  </Box>
);

export default AccountActions;
