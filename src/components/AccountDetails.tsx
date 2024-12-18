// components/AccountDetails.tsx
import Cuenta from "@/pages/Cuenta/Cuenta";

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
  <Cuenta
    setProduct={setProduct}
    setNegative={setNegative}
    deleteOffer={deleteOffer}
    data={data}
    load={load}
    setCuenta={setCuenta}
  />
);

export default AccountDetails;
