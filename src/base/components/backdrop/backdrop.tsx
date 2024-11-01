import "./backdrop.css";

import { Backdrop, Box } from "@mui/material";

function SessionBackDrop() {
  return (
    <Backdrop open={false} sx={{ zIndex: "1200" }}>
      <Box
        display={"flex"}
        width={"100%"}
        height={"100%"}
        className="backdrop-box"
      >
        <span style={{ margin: "auto" }} className={"loader"} />
      </Box>
    </Backdrop>
  );
}

export default SessionBackDrop;
