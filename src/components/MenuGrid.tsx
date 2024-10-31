// components/MenuGrid.tsx
import { Box, Grid } from "@mui/material";
import MenuItemCard from "./MenuItemCard";

const MenuGrid = ({
  items,
  onSelect,
  onDelete,
  onEdit,
}: {
  items: any[];
  onSelect: (id: any) => void;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
}) => (
  <Box maxHeight={"74vh"} overflow={"auto"}>
    <Grid container spacing={2}>
      {items?.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <MenuItemCard
            item={item}
            onSelect={onSelect}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default MenuGrid;
