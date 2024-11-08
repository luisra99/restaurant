import Box from "@mui/material/Box";
import Main from "./main";
import PropTypes from "prop-types";
import { useScrollToTop } from "@/base/hooks/use-scroll-to-top";
import { useState } from "react";
import Header from "./header";

export default function DashboardLayout({ children }: any) {
  const [openNav, setOpenNav] = useState(false);

  useScrollToTop();
  // SessionManager();
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} /> */}
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
