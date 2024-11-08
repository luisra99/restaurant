import { useState, useEffect } from "react";
import { getOffers, deleteOffer, getRecent } from "@/services/menu";
import { getConcepts } from "@/services/concept";

// Función para normalizar texto: elimina tildes, espacios y convierte a minúsculas
const normalizeText = (text: string) =>
  text
    .normalize("NFD") // Descompone tildes y otros acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/\s+/g, "") // Elimina espacios
    .toLowerCase(); // Convierte a minúsculas

const useMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("Reciente");
  const [categories, setCategories] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [recents, setRecents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);

  const loadMenuData = async () => {
    const _categories = await getConcepts("Categorías");
    const _menu = await getOffers();
    const _recent = await getRecent();

    setMenu(
      _menu.map((item: any) => ({
        ...item,
        nameLower: normalizeText(item.name),
        descriptionLower: normalizeText(item.description || ""),
        detailsLower: normalizeText(item.details || ""),
      }))
    );
    setCategories(_categories);
    setRecents(
      _recent.map((item: any) => ({
        ...item,
        nameLower: normalizeText(item.name),
        descriptionLower: normalizeText(item.description || ""),
        detailsLower: normalizeText(item.details || ""),
      }))
    );
  };

  useEffect(() => {
    loadMenuData();
  }, []);

  const handleDelete = async (id: any) => {
    await deleteOffer(id);
    loadMenuData();
  };

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleCategoryChange = (value: string) => setCategory(value);

  // Debounce effect for searchTerm
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(normalizeText(searchTerm));
    }, 500); // Ajustable delay time in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const filteredItems =
    category === "Reciente"
      ? debouncedSearchTerm
        ? menu.filter((item) => {
            return (
              item.nameLower.includes(debouncedSearchTerm) ||
              item.descriptionLower.includes(debouncedSearchTerm) ||
              item.detailsLower.includes(debouncedSearchTerm)
            );
          })
        : recents
      : menu.filter((item) => {
          return (
            item.category.id === category &&
            (item.nameLower.includes(debouncedSearchTerm) ||
              item.descriptionLower.includes(debouncedSearchTerm) ||
              item.detailsLower.includes(debouncedSearchTerm))
          );
        });

  return {
    searchTerm,
    category,
    categories,
    menu,
    recents,
    open,
    id,
    filteredItems,
    setOpen,
    setId,
    loadMenuData,
    handleDelete,
    handleSearchChange,
    handleCategoryChange,
  };
};

export default useMenu;
