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
} from "@mui/material";
import { LoadConcept } from "@/utils/concepts";
import { getOffers } from "@/services/menu";

const menuItems = [
  {
    id: 1,
    name: "Manjar de quesos y embutidos",
    price: 4500,
    description:
      "Quesos (Ahumado,Semicurado y Emental), Jamón Serrano, Chorizo, Jamon barra, Frutos secos, Miel de abejas, Palitroque tomate",
    category: "Entrantes fríos",
    image: "/images/img.webp",
  },
  {
    id: 2,
    name: "Ensalada de Vegetales de Estación",
    price: 750,
    description:
      "Zanahoria, remolacha,aguacate,pepino encurtido, lechuga y habichuela",
    category: "Menú vegetariano",
    image: "/images/img (1).webp",
  },
  {
    id: 3,
    name: "Jugo natural",
    price: 300,
    description: "Frutas de temporada",
    category: "Aguas y jugos",
    image: "/images/img (2).webp",
  },
  {
    id: 1,
    name: "Manjar de quesos y embutidos",
    price: 4500,
    description:
      "Quesos (Ahumado,Semicurado y Emental), Jamón Serrano, Chorizo, Jamon barra, Frutos secos, Miel de abejas, Palitroque tomate",
    category: "Entrantes fríos",
    image: "/images/img.webp",
  },
  {
    id: 2,
    name: "Ensalada de Vegetales de Estación",
    price: 750,
    description:
      "Zanahoria, remolacha,aguacate,pepino encurtido, lechuga y habichuela",
    category: "Menú vegetariano",
    image: "/images/img (1).webp",
  },
  {
    id: 3,
    name: "Jugo natural",
    price: 300,
    description: "Frutas de temporada",
    category: "Aguas y jugos",
    image: "/images/img (2).webp",
  },
  {
    id: 1,
    name: "Manjar de quesos y embutidos",
    price: 4500,
    description:
      "Quesos (Ahumado,Semicurado y Emental), Jamón Serrano, Chorizo, Jamon barra, Frutos secos, Miel de abejas, Palitroque tomate",
    category: "Entrantes fríos",
    image: "/images/img.webp",
  },
  {
    id: 2,
    name: "Ensalada de Vegetales de Estación",
    price: 750,
    description:
      "Zanahoria, remolacha,aguacate,pepino encurtido, lechuga y habichuela",
    category: "Menú vegetariano",
    image: "/images/img (1).webp",
  },
  {
    id: 3,
    name: "Jugo natural",
    price: 300,
    description: "Frutas de temporada",
    category: "Aguas y jugos",
    image: "/images/img (2).webp",
  },
  {
    id: 1,
    name: "Manjar de quesos y embutidos",
    price: 4500,
    description:
      "Quesos (Ahumado,Semicurado y Emental), Jamón Serrano, Chorizo, Jamon barra, Frutos secos, Miel de abejas, Palitroque tomate",
    category: "Entrantes fríos",
    image: "/images/img.webp",
  },
  {
    id: 2,
    name: "Ensalada de Vegetales de Estación",
    price: 750,
    description:
      "Zanahoria, remolacha,aguacate,pepino encurtido, lechuga y habichuela",
    category: "Menú vegetariano",
    image: "/images/img (1).webp",
  },
  {
    id: 3,
    name: "Jugo natural",
    price: 300,
    description: "Frutas de temporada",
    category: "Aguas y jugos",
    image: "/images/img (2).webp",
  },
  {
    id: 1,
    name: "Manjar de quesos y embutidos",
    price: 4500,
    description:
      "Quesos (Ahumado,Semicurado y Emental), Jamón Serrano, Chorizo, Jamon barra, Frutos secos, Miel de abejas, Palitroque tomate",
    category: "Entrantes fríos",
    image: "/images/img.webp",
  },
  {
    id: 2,
    name: "Ensalada de Vegetales de Estación",
    price: 750,
    description:
      "Zanahoria, remolacha,aguacate,pepino encurtido, lechuga y habichuela",
    category: "Menú vegetariano",
    image: "/images/img (1).webp",
  },
  {
    id: 3,
    name: "Jugo natural",
    price: 300,
    description: "Frutas de temporada",
    category: "Aguas y jugos",
    image: "/images/img (2).webp",
  },
];

const Menu = ({ setProduct }: { setProduct?: (args: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todo");
  const [categorys, setCategorys] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const Load = async () => {
    const _concepts = await LoadConcept(1);
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
      <TextField
        fullWidth
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
      />

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

      <Grid container spacing={2} maxHeight={"74vh"} overflow={"auto"} pt={2}>
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
    </>
  );
};

export default Menu;
