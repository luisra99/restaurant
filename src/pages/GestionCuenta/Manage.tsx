import Meta from "@/base/components/Meta";
import AccountMenu from "@/components/AccountMenu";
import useManage from "./useManage";
import AccountDetails from "@/components/AccountDetails";
import CalculatorModal from "@/components/CalculatorModal";

function Manage() {
  const {
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
  } = useManage();

  return (
    <>
      <Meta title="Configuración" />
      <AccountMenu setProduct={setOpen} />
      <AccountDetails
        setProduct={setOpen}
        setNegative={setNegative}
        deleteOffer={deleteOffer}
        data={cuenta}
        load={loadAccountData}
      />
      <CalculatorModal
        open={open}
        handleClose={handleClose}
        quantity={quantity}
        setQuantity={setQuantity}
        modifyAccount={modifyAccount}
        negative={negative}
        setNegative={setNegative}
      />
    </>
  );
}

export default Manage;
