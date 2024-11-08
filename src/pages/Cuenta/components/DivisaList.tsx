import { FunctionComponent } from "react";
import DivisaAmount from "./DivisaAmount";
import { Grid } from "@mui/material";

interface DivisaListProps {
  divisaList: any[];
}

const DivisaList: FunctionComponent<DivisaListProps> = ({ divisaList }) => {
  return (
    <Grid
      container
      spacing={1}
      width={"100%"}
      mt={1}
      justifyContent={"space-evenly"}
    >
      {divisaList?.map((currency: any) => (
        <DivisaAmount currency={currency} key={currency} />
      ))}
    </Grid>
  );
};

export default DivisaList;
