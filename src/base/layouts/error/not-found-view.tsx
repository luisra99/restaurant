import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/base/routes/components";

import Logo from "@/base/components/logo";

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: "fixed",
        p: (theme) => ({
          xs: theme.spacing(3, 3, 0),
          sm: theme.spacing(5, 5, 0),
        }),
      }}
    >
      <Logo sx={{ minWidth: "100px", maxWidth: "150px", width: "100%" }} />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            !Lo sentimos, no encontramos esta página!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            No encontramos la página que esta buscando.¿Se habrá confundido de
            url? Asegurese de estar escribiendola correctamente.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: "auto",
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button
            href="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Ir a la pagina de inicio
          </Button>
        </Box>
      </Container>
    </>
  );
}
