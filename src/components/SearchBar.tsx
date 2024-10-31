// components/SearchBar.tsx
import { Grid, TextField, Button } from "@mui/material";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onOpenModal,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenModal: () => void;
}) => (
  <Grid container spacing={1} alignItems="center" p={2}>
    <Grid item xs={11}>
      <TextField
        fullWidth
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Grid>
    <Grid item xs={1}>
      <Button variant="contained" fullWidth onClick={onOpenModal}>
        Crear oferta
      </Button>
    </Grid>
  </Grid>
);

export default SearchBar;
