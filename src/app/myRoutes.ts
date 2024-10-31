import { Pages } from "./myPages.enum";
import { Routes } from "@/base/routes/types";
import Welcome from "@/pages/Welcome";
import Mesas from "@/pages/Mesas/Mesas";
import Menu from "@/pages/Menu/Menu";
import Manage from "@/pages/GestionCuenta/Manage";
import AddMenuOffer from "@/pages/Oferta/MenuOfferForm";
import Config from "@/pages/Configuracion/Config";
import Cuentas from "@/pages/Cuenta/Cuentas";
import Caja from "@/pages/Caja/Caja";
import Test from "@/pages/Test/Test";

const myRoutes: Routes = {
  [Pages.Welcome]: {
    component: Welcome,
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
  [Pages.Caja]: {
    component: Caja,
    path: "/point",
    title: "Caja",
  },
  [Pages.Manage]: {
    component: Manage,
    path: "/manage",
  },
  [Pages.Offer]: {
    component: AddMenuOffer,
    path: "/offer",
  },
  [Pages.Test]: {
    component: Test,
    title: "Test",
    path: "/test",
  },
};

export default myRoutes;
