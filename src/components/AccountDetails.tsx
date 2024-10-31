// components/AccountDetails.tsx
import Cuenta from "@/pages/Cuenta/Cuenta";
import { Box } from "@mui/material";

const AccountDetails = ({
  setProduct,
  setNegative,
  deleteOffer,
  data,
  load,
}: {
  setProduct: (value: number | null) => void;
  setNegative: (value: boolean) => void;
  deleteOffer: (id: number) => void;
  data: any;
  load: () => any;
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
    />
  </Box>
);

export default AccountDetails;
