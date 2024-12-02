// components/AccountMenu.tsx
import Menu from "@/pages/Menu/Menu";

const AccountMenu = ({
  setProduct,
}: {
  setProduct: (value: string | null) => void;
}) => <Menu setProduct={setProduct} />;

export default AccountMenu;
