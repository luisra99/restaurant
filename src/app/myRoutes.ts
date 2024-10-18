import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import HomeIcon from "@mui/icons-material/Home";

import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { Pages } from "./myPages.enum";
import { Routes } from "@/_pwa-framework/routes/types";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import WcIcon from "@mui/icons-material/Wc";
import Welcome from "@/pages/Welcome";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Mesas from "@/pages/Mesas/Mesas";
import Menu from "@/pages/Menu/Menu";
import Cuenta from "@/pages/Cuenta/Cuenta";
import Manage from "@/pages/GestionCuenta/Manage";
import AddMenuOffer from "@/pages/Oferta/Oferta";
import Config from "@/pages/Configuracion/Config";
import OpenAccount from "@/pages/Cuenta/components/FormularioCuenta";
import Cuentas from "@/pages/Cuenta/Cuentas";

const myRoutes: Routes = {
  [Pages.Welcome]: {
    component: Cuentas,
    path: "/",
    title: "Inicio",
  },
  [Pages.Accounts]: {
    component: Cuentas,
    path: "/accounts",
  },
  [Pages.Mesas]: {
    component: Mesas,
    path: "/mesas",
    title: "Mesas",
  },
  [Pages.Menu]: {
    component: Menu,
    path: "/menu",
    title: "Menú",
  },
  [Pages.Config]: {
    component: Config,
    path: "/config",
    title: "Configuración",
  },
  [Pages.Manage]: {
    component: Manage,
    path: "/manage",
  },
  [Pages.Offer]: {
    component: AddMenuOffer,
    path: "/offer",
  },
};

export default myRoutes;
