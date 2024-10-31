// components/CalculatorModal.tsx
import { Box, Modal } from "@mui/material";
import Calculator from "@/components/Calculadora";

const CalculatorModal = ({
  open,
  handleClose,
  quantity,
  setQuantity,
  modifyAccount,
  negative,
  setNegative,
}: {
  open: number | null;
  handleClose: () => void;
  quantity: string;
  setQuantity: (value: string) => void;
  modifyAccount: () => Promise<void>;
  negative: boolean;
  setNegative: (value: boolean) => void;
}) => (
  <Modal
    open={!!open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Calculator
        result={quantity}
        setResult={setQuantity}
        submit={async () => {
          await modifyAccount();
        }}
      />
    </Box>
  </Modal>
);

export default CalculatorModal;
