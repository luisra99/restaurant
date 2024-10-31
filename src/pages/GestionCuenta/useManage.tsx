// hooks/useManage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAccount,
  deleteAccountDetails,
  modifyAccountDetails,
} from "@/services/account";

const useManage = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState<number | null>(null);
  const [idAccount, setAccount] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [negative, setNegative] = useState<boolean>(false);
  const [cuenta, setCuenta] = useState<any>({});

  const handleClose = () => setOpen(null);

  const deleteOffer = async (idOffer: number) => {
    await deleteAccountDetails({ idAccount, idOffer });
    await loadAccountData();
  };

  const loadAccountData = async () => {
    const id = Number(searchParams.get("id"));
    if (typeof id === "number") {
      setAccount(id);
      const accountData = await getAccount(id);
      setCuenta(accountData);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, [searchParams]);

  const modifyAccount = async () => {
    await modifyAccountDetails({
      idAccount,
      quantity: Number(quantity),
      negative,
      idOffer: open,
    });
    setNegative(false);
    setOpen(null);
    setQuantity("");
    await loadAccountData();
  };

  return {
    open,
    setOpen,
    idAccount,
    cuenta,
    quantity,
    setQuantity,
    negative,
    setNegative,
    handleClose,
    deleteOffer,
    modifyAccount,
    loadAccountData,
  };
};

export default useManage;
