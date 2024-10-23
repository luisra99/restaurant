import { HEADER, NAV } from "./config-layout";

import AccountPopover from "./common/account-popover";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LanguagePopover from "./common/language-popover";
import NotificationsPopover from "./common/notifications-popover";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { bgBlur } from "../../theme/css";
import { useResponsive } from "../../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Home,
  ShoppingCart,
} from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { RouterLink } from "@/_pwa-framework/routes/components";
import { Routes } from "@/_pwa-framework/routes/types";
import Scrollbar from "@/_pwa-framework/components/scrollbar/scrollbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import routes from "@/_pwa-framework/routes";
import { usePathname } from "@/_pwa-framework/routes/hooks";
import { useSession } from "@/_pwa-framework/session/state";
import { NavItem } from "./common/NavItem";
import OpenAccount from "@/pages/Cuenta/components/FormularioCuenta";
import { minWidth } from "@mui/system";
import { useNavigate } from "react-router-dom";
export default function Header({ onOpenNav }: any) {
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState<any>({});
  const navegar = useNavigate();
  const [openAccount, setOpenAccount] = useState<any>(false);
  const handleClick = (param?: string) => {
    param && setOpen((prevState: any) => ({ [param]: !prevState[param] }));
  };
  const style = {
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {/* {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <svg
            aria-hidden="true"
            role="img"
            className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="12" r="1" fill="currentColor"></circle>
            <rect
              width="14"
              height="2"
              x="7"
              y="11"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="16"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="6"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
          </svg>
        </IconButton>
      )} */}

      {/* <Searchbar /> */}

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {/* <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack> */}
    </>
  );
  const blur = bgBlur({
    color: theme.palette.background.default,
  });
  const _lgUp = lgUp
    ? {
        width: `calc(100% - ${NAV.WIDTH + 1}px)`,
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
          {renderContent}
          <Box display={"flex"} flexGrow={1} />
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => navegar(`/accounts`)}
          >
            Ver Cuentas
          </Button>

          <Button variant="contained" onClick={() => setOpenAccount(true)}>
            Abrir cuenta{" "}
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        onClose={handleClose}
        open={!!openAccount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OpenAccount handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
