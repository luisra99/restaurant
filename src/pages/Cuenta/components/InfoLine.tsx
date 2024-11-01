import { Info } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface InfoLineProps {
  name?: string;
  people?: number;
}

const InfoLine: FunctionComponent<InfoLineProps> = ({ name, people }) => {
  return (
    <Grid
      item
      xs={12}
      mt={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {(name || people) && (
        <Info sx={{ mr: 1, color: "gray", fontSize: "20px" }} />
      )}

      <Typography variant="overline" letterSpacing={1} color={"gray"}>
        <i>
          {name}
          {people && ` - ${people > 1 ? "personas" : "persona"}`}
        </i>
      </Typography>
    </Grid>
  );
};

export default InfoLine;
