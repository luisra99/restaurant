import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Link } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { RouterLink } from "@/base/routes/components";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

const MENU_OPTIONS = [
  {
    label: "Inicio",
    icon: "eva:home-fill",
    path: "/",
  },
  {
    label: "Mi Perfil",
    icon: "eva:person-fill",
    path: "/profile",
  },
  {
    label: "Ajustes",
    icon: "eva:settings-2-fill",
    path: "/ajustes",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const CerrarSesion = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) =>
            open
              ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
              : alpha(theme.palette.grey[500], 0.08),
        }}
      >
        <Avatar
          src={""}
          alt={"U"}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {"a".charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            name
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            email@dominio.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <Link
            component={RouterLink}
            href={option.path}
            display={"contents"}
            key={option.path}
          >
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={CerrarSesion}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Cerrar Sesión
        </MenuItem>
      </Popover>
    </>
  );
}
