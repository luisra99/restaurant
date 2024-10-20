import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import AddMenuOffer from "../Oferta/Oferta";
import PaymentModal from "../Payment/PaymentModal";

function Welcome() {
  return (
    <>
      <Meta title="Configuración" />
      <Box justifyContent={"center"} width={"100%"} p={5}>
        <PaymentModal open={true} onClose={() => console.log()} idAccount={1} />
      </Box>
    </>
  );
}

export default Welcome;
