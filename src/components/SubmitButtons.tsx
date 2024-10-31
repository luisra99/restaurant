// SubmitButtons.tsx
import { Box, Button } from "@mui/material";

interface SubmitButtonsProps {
  handleClose: () => void;
  isUpdate: boolean;
}

const SubmitButtons = ({ handleClose, isUpdate }: SubmitButtonsProps) => (
  <Box display={"flex"} justifyContent={"space-between"} gap={1} pb={2}>
    <Button variant="text" color="primary" fullWidth onClick={handleClose}>
      Cerrar
    </Button>
    <Button type="submit" variant="contained" color="primary" fullWidth>
      {isUpdate ? "Actualizar" : "Agregar Oferta"}
    </Button>
  </Box>
);

export default SubmitButtons;
