// components/AccountDetails.tsx
import Cuenta from "@/pages/Cuenta/Cuenta";
import { Box } from "@mui/material";

const AccountDetails = ({
  setProduct,
  setNegative,
  deleteOffer,
  data,
  load,
  setCuenta,
}: {
  setProduct: (value: string | null) => void;
  setNegative: (value: boolean) => void;
  deleteOffer: (id: string) => void;
  data: any;
  load: () => any;
  setCuenta: (args: any) => any;
}) => (
  <Box
    sx={{
      maxHeight: "93vh",
      marginLeft: "62vw",
      overflow: "auto",
      p: 1,
    }}
  >
    <Cuenta
      setProduct={setProduct}
      setNegative={setNegative}
      deleteOffer={deleteOffer}
      data={data}
      load={load}
      setCuenta={setCuenta}
    />
  </Box>
);

export default AccountDetails;
