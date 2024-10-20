import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Modal,
} from "@mui/material";
import { LoadConcept } from "@/utils/concepts";
import { deleteOffer, getOffers } from "@/services/menu";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import OpenAccount from "../Cuenta/components/FormularioCuenta";
import AddMenuOffer from "../Oferta/Oferta";

const style = {
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Menu = ({ setProduct }: { setProduct?: (args: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todo");
  const [categorys, setCategorys] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);

  const navegar = useNavigate();
  const Load = async () => {
    const _concepts = await LoadConcept("Categorías");
    const _menu = await getOffers();
    setMenu([..._menu]);
    setCategorys([..._concepts]);
  };

  useEffect(() => {
    Load();
  }, []);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategory(event.target.value);
  };

  const filteredItems = menu.filter((item) => {
    const isInCategory = category === "Todo" || item.category.id === category;
    const isInSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Number(searchTerm) + 200 >= Number(item.price) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());
    return isInCategory && isInSearch;
  });

  return (
    <>
      {/* Barra de búsqueda */}
      <Grid container spacing={1} alignItems={"center"} p={2}>
        <Grid item xs={11}>
          <TextField
            fullWidth
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "100%" }}
            onClick={() => navegar(`/offer`)}
          >
            Crear oferta
          </Button>
        </Grid>
      </Grid>

      {/* Filtro por categorías */}
      <Box mb={2}>
        <Chip
          color="primary"
          size="medium"
          label={"Todo"}
          variant={category === "Todo" ? "filled" : "outlined"}
          clickable
          sx={{ ml: 1, mb: 1 }}
          onClick={() => setCategory("Todo")}
        />
        {categorys.map((cat) => (
          <Chip
            color="primary"
            size="medium"
            label={cat.denomination}
            variant={category === cat.id ? "filled" : "outlined"}
            clickable
            sx={{ ml: 1, mb: 1 }}
            onClick={() => setCategory(cat.id)}
          />
        ))}
      </Box>

      {/* Grid del menú */}

      {/* Efecto de desvanecimiento inferior */}

      <Grid container spacing={2} maxHeight={"74vh"} overflow={"auto"} p={2}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            height: "50px", // Altura del difuminado
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
            zIndex: 1,
          }}
        />
        {filteredItems.map((item) => (
          <Grid
            item
            key={item.id}
            xs={4}
            sm={3}
            pb={2}
            onClick={() => setProduct?.(item.id)}
            sx={{ cursor: "pointer" }}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:4000/public/${item.image}`}
                alt={item.name}
                sx={{
                  objectFit: "cover", // Asegura que la imagen cubra el área sin distorsionarse
                  width: "100%", // Hace que la imagen ocupe todo el ancho del contenedor
                  borderRadius: "8px 8px 0 0", // Bordes redondeados en la parte superior
                }}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="h6">${item.price}</Typography>
                <Box display={"flex"} justifyContent={"flex-end"}>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={() => deleteOffer(item.id)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setId(item.id);
                      setOpen(true);
                    }}
                  >
                    Modificar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px", // Altura del difuminado
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
            zIndex: 1,
          }}
        />
      </Grid>
      <Modal
        onClose={() => {
          setOpen(false);
          setId(null);
        }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddMenuOffer id={id} />
        </Box>
      </Modal>
    </>
  );
};

export default Menu;
