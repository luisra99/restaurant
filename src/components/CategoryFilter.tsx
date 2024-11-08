// components/CategoryFilter.tsx
import { Box, Chip } from "@mui/material";
const sx = { m: 0.3 };
const CategoryFilter = ({
  category,
  categories,
  onCategoryChange,
}: {
  category: string;
  categories: any[];
  onCategoryChange: (value: string) => void;
}) => (
  <Box mb={2}>
    <Chip
      label="Reciente"
      clickable
      sx={sx}
      color={category === "Reciente" ? "primary" : "default"}
      onClick={() => onCategoryChange("Reciente")}
    />
    {categories?.map((cat) => (
      <Chip
        key={cat.id}
        label={cat.denomination}
        clickable
        sx={sx}
        color={category === cat.id ? "primary" : "default"}
        onClick={() => onCategoryChange(cat.id)}
      />
    ))}
  </Box>
);

export default CategoryFilter;
