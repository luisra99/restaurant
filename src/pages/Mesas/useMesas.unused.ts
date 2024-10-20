import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Button, Grid, Modal, Paper, Typography } from "@mui/material";
import Calculator from "@/app/components/calculator/Calc";
import { Home, Person, Shop, Timelapse } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import { listTables } from "@/services/table";
import axios from "axios";
import { fToNow } from "@/_pwa-framework/utils/format-time";
import { getAccounts } from "@/services/account";
import OpenAccount from "../Cuenta/components/FormularioCuenta";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function useMesas():any[] {
  const [openAccount, setOpenAccount] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [mesas, setMesas] = useState<any[]>([]);
  const navegar = useNavigate();
  function handleClose(): void {
    setOpenAccount(false);
    Load();
  }
  const Load = async () => {
    const _concepts = await listTables();
    getAccounts();
    setMesas([..._concepts]);
  };
  const statusColors: { [key: number]: string } = {
    0: "lightgreen",
    1: "lightcoral",
    2: "lightyellow",
    3: "orange",
    4: "lightblue",
  };
  useEffect(() => {
    Load();
  }, []);

  return [Load,mesas,navegar,openAccount,setOpenAccount,handleClose,style];
}

export default useMesas;
