// components/MenuItemCard.tsx
import { usePathname } from "@/base/routes/hooks";
import { CalculateRounded, Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";

const MenuItemCard = ({
  item,
  onSelect,
  onDelete,
  onEdit,
  onSelectForCalc,
}: {
  item: any;
  onSelect: (id: any) => void;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
  onSelectForCalc: (id: any) => void;
}) => {
  const path = usePathname();
  return (
    <Card
      sx={{
        paddingBottom: 0,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        onClick={() => onSelect(item.id)}
      >
        {path == "/menu" && item.image && (
          <CardMedia
            component="img"
            height="140"
            image={`/api/public/${item.image}`}
          />
        )}
        <CardContent sx={{ padding: "8px 12px !important" }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{item.description}</Typography>
          <Typography variant="body2">${item.price}</Typography>
        </CardContent>
      </Box>
      <CardActions>
        {path !== "/menu" && (
          <IconButton color="primary" onClick={() => onSelectForCalc(item.id)}>
            <CalculateRounded />
          </IconButton>
        )}
        {path == "/menu" && (
          <>
            <IconButton color="error" onClick={() => onDelete(item.id)}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => onEdit(item.id)}>
              <Edit />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default MenuItemCard;
