import { HEADER, NAV } from "./config-layout";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { useResponsive } from "../../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";
import { Dialog } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import routes from "@/base/routes";
import { NavItem } from "./common/NavItem";
import OpenAccount from "@/components/revisar/FormularioCuenta";
import PropinaModal from "@/pages/Payment/PropinaModal";
export default function Header({ onOpenNav }: any) {
  const theme = useTheme();
  const [propina, setPropina] = useState<any>(false);
  const [openAccount, setOpenAccount] = useState<any>(false);

  const lgUp = useResponsive("up", "lg");

  const _lgUp = lgUp
    ? {
        width: `calc(100% - ${NAV.WIDTH}px)`,
        height: HEADER.H_DESKTOP,
      }
    : {};
  const _style = Object.assign(
    {
      height: HEADER.H_MOBILE,
      zIndex: theme.zIndex.appBar + 1,
      transition: theme.transitions.create(["height"], {
        duration: theme.transitions.duration.shorter,
      }),
      backgroundColor: "#ffffff00",
      backdropFilter:
        "blur(100px) saturate(150%)" /* Efecto de desenfoque y saturación */,
      // webkitBackdropFilter: "blur(10px) saturate(150%)"; /* Soporte para Safari */
      boxShadow:
        "0 4px 30px rgba(0, 0, 0, 0.1)" /* Sombra para dar profundidad */,
      // border: "1px solid rgba(255, 255, 255, 0.5)" /* Borde blanco semitransparente */
    },
    _lgUp
  );
  const menu = Object.values(routes)
    .filter(({ title }) => title)
    .map((item) => {
      const { subPath, path, title, icon: Icon } = item;

      if (subPath === undefined) {
        return <NavItem key={path} item={item} />;
      }
    });

  function handleClose(): void {
    setOpenAccount(false);
  }

  return (
    <>
      <AppBar sx={{ ..._style, backgroundColor: "#ffffff00" }}>
        <Toolbar sx={{ minHeight: "50px !important" }}>
          {menu}
          <Box display={"flex"} flexGrow={1} />
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => setPropina(true)}
          >
            Propina
          </Button>

          <Button variant="contained" onClick={() => setOpenAccount(true)}>
            Abrir cuenta{" "}
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog fullScreen onClose={handleClose} open={!!openAccount}>
        <OpenAccount handleClose={handleClose} />
      </Dialog>

      <PropinaModal onClose={() => setPropina(false)} open={!!propina} />
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
