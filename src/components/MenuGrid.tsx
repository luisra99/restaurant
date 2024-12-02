import { Grid } from "@mui/material";
import MenuItemCard from "./MenuItemCard";

const MenuGrid = ({
  items,
  onSelect,
  onDelete,
  onEdit,
  letterRefs,
  onSelectForCalc,
}: {
  items: any[];
  onSelect: (id: any) => void;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
  onSelectForCalc: (id: any) => void;
  letterRefs: any;
}) => {
  const lettersAssigned = new Set(); // Mantiene registro de las letras a las que ya se asignó una referencia

  return (
    <Grid container spacing={2}>
      {items?.map((item) => {
        const firstLetter = String(item.name).charAt(0).toUpperCase();
        const ref = lettersAssigned.has(firstLetter)
          ? null
          : letterRefs.current[firstLetter];

        if (!lettersAssigned.has(firstLetter)) {
          lettersAssigned.add(firstLetter); // Marca la letra como asignada
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} ref={ref}>
            <MenuItemCard
              item={item}
              onSelect={onSelect}
              onDelete={onDelete}
              onEdit={onEdit}
              onSelectForCalc={onSelectForCalc}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MenuGrid;
