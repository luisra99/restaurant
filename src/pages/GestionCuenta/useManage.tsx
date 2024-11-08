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
  const [open, setOpen] = useState<string | null>(null);
  const [idAccount, setAccount] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [negative, setNegative] = useState<boolean>(false);
  const [cuenta, setCuenta] = useState<any>({});

  const handleClose = () => setOpen(null);

  const deleteOffer = async (idOffer: string) => {
    const account = await deleteAccountDetails({ idAccount, idOffer });
    if (account) setCuenta(account);
  };

  const loadAccountData = async () => {
    const id = searchParams.get("id");
    if (id) {
      setAccount(id);
      const accountData = await getAccount(id);
      setCuenta(accountData);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, [searchParams]);

  const modifyAccount = async () => {
    const account = await modifyAccountDetails({
      idAccount,
      quantity: Number(quantity),
      negative,
      idOffer: open,
    });
    setNegative(false);
    setOpen(null);
    setQuantity("");
    if (account) setCuenta(account);
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
    setCuenta,
  };
};

export default useManage;
