import OpenAccount from "@/components/revisar/FormularioCuenta";
import { Dialog } from "@mui/material";
import { FunctionComponent } from "react";

interface ModifyAccountProps {
  id: string;
  handleClose: any;
  open: boolean;
}

const ModifyAccount: FunctionComponent<ModifyAccountProps> = ({
  id,
  open,
  handleClose,
}) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <OpenAccount id={id} handleClose={handleClose} />
    </Dialog>
  );
};

export default ModifyAccount;
