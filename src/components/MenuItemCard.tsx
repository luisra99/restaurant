// components/MenuItemCard.tsx
import { usePathname } from "@/base/routes/hooks";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const MenuItemCard = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}: {
  item: any;
  onSelect: (id: any) => void;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
}) => {
  const path = usePathname();
  return (
    <Card onClick={() => onSelect(item.id)}>
      {path == "/menu" && item.image && (
        <CardMedia
          component="img"
          height="140"
          image={`/api/public/${item.image}`}
        />
      )}
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Typography variant="h6">${item.price}</Typography>
        {path == "/menu" && (
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(item.id)}
            >
              Eliminar
            </Button>
            <Button variant="contained" onClick={() => onEdit(item.id)}>
              Modificar
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
