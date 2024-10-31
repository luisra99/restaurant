import { FC } from "react";
import { PathRouteProps } from "react-router-dom";

import type { SvgIconProps } from "@mui/material/SvgIcon";

type PathRouteCustomProps = {
  title?: string;
  component?: FC;
  icon?: FC<SvgIconProps>;
  subPath?: Routes;
};

type Routes = Record<string, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
