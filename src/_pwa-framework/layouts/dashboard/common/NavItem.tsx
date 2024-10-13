import { RouterLink } from "@/_pwa-framework/routes/components";
import { usePathname } from "@/_pwa-framework/routes/hooks";
import { Box, Button, ListItemButton } from "@mui/material";
import { alpha } from "@mui/material/styles";

export function NavItem({ item, parent }: any) {
    const pathname = usePathname();
  
    const active = `${item.path}` === pathname;
  
    return (
      <Button
        component={RouterLink}
        href={item.path}
        name={item.path}
        sx={{
          borderRadius: 0.75,
          typography: "body2",
          color: "text.secondary",
          fontWeight: "fontWeightMedium",
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
          m:1
        }}
      >
       { item.icon && <Box sx={{ width: 24, height: 24, mr: 2 }}>
          <item.icon />
        </Box>}
  
        <Box component="span">{item.title}</Box>
      </Button>
    );
  }
  