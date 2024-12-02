import { Add, ArrowBackIosNewRounded } from "@mui/icons-material";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onOpenModal,
  categoryLabel,
  handleLetterClick,
  handleCategoryChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenModal: () => void;
  categoryLabel: string | undefined;
  handleLetterClick: (letter: string) => void;
  handleCategoryChange: (category: string) => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={1} alignItems="center" height={"100px"}>
      {categoryLabel && (
        <Grid item xs={6} sm={5} md={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ArrowBackIosNewRounded />}
            onClick={() => handleCategoryChange("Reciente")}
          >
            {categoryLabel}
          </Button>
        </Grid>
      )}

      <Grid
        item
        xs={categoryLabel ? 4.85 : 10.85}
        sm={categoryLabel ? 5.85 : 10.85}
        md={categoryLabel ? 6.85 : 10.85}
      >
        <TextField
          fullWidth
          size="small"
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>

      <Grid item xs={1} textAlign={"center"}>
        <Button
          variant="contained"
          onClick={onOpenModal}
          sx={{ padding: "6px !important", minWidth: "unset !important" }}
        >
          <Add />
        </Button>
      </Grid>
      <Grid item xs={12} textAlign={"center"}>
        <AlphabetScrollBar onLetterClick={handleLetterClick} />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
const AlphabetScrollBar = ({
  onLetterClick,
}: {
  onLetterClick: (letter: string) => void;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "visible",
      }}
    >
      <Grid container spacing={0} justifyContent={"center"}>
        {alphabet.map((letter) => (
          <Grid item key={letter} padding={"0px !important"}>
            <Button
              variant="text"
              color="primary"
              onClick={() => onLetterClick(letter)}
              sx={{
                minWidth: "auto",
                fontSize: "0.9rem",
                width: { xs: "17px", sm: "25px" },
                padding: "0px !important",
                height: { xs: "17px", sm: "25px" },
              }}
            >
              {letter}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
