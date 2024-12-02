import { Button, Grid } from "@mui/material";

const sx = {
  m: 0,
  fontSize: { xs: "0.90rem", sm: "0.9rem", md: "1rem" },
  padding: { xs: "10px 0", sm: "10px 0", md: "6px 0" },
};

const CategoryFilter = ({
  category,
  categories,
  onCategoryChange,
}: {
  category: string;
  categories: { id: string; denomination: string }[];
  onCategoryChange: (value: string, categoryLabel?: string) => void;
}) => (
  <Grid container spacing={1} alignItems="center" p={0.2}>
    <Grid item xs={4} sm={4} md={3} lg={2}>
      <Button
        fullWidth
        variant={category === "Reciente" ? "contained" : "outlined"}
        color="primary"
        sx={sx}
        onClick={() => onCategoryChange("Reciente")}
      >
        Reciente
      </Button>
    </Grid>
    {categories?.map((cat) => (
      <Grid item xs={4} sm={4} md={3} lg={2} key={cat.id}>
        <Button
          fullWidth
          variant={category === cat.id ? "contained" : "outlined"}
          color="primary"
          sx={sx}
          onClick={() => onCategoryChange(cat.id, cat.denomination)}
        >
          {cat.denomination}
        </Button>
      </Grid>
    ))}
  </Grid>
);

export default CategoryFilter;
