// components/AccountMenu.tsx
import Menu from "@/pages/Menu/Menu";
import { Box } from "@mui/material";

const AccountMenu = ({
  setProduct,
}: {
  setProduct: (value: string | null) => void;
}) => (
  <Box sx={{ width: "60vw" }} position={"absolute"}>
    <Menu setProduct={setProduct} />
  </Box>
);

export default AccountMenu;
