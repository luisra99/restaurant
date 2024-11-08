import { Pages } from "./myPages.enum";
import { Routes } from "@/base/routes/types";
import Menu from "@/pages/Menu/Menu";
import Manage from "@/pages/GestionCuenta/Manage";
import AddMenuOffer from "@/pages/Oferta/MenuOfferForm";
import Config from "@/pages/Configuracion/Config";
import Cuentas from "@/pages/Cuenta/Cuentas";
import Caja from "@/pages/Caja/Caja";
import Test from "@/pages/Test/Test";
import Mesas from "@/pages/Mesas/Mesas";

const myRoutes: Routes = {
  [Pages.Mesas]: {
    component: Mesas,
    path: "/",
    title: "Mesas",
  },
  [Pages.Accounts]: {
    component: Cuentas,
    path: "/accounts",
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
    path: "/test",
  },
};

export default myRoutes;
