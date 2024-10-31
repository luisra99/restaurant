// hooks/useMenu.tsx
import { useState, useEffect } from "react";
import { LoadConcept } from "@/utils/concepts";
import { getOffers, deleteOffer } from "@/services/menu";

const useMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todo");
  const [categories, setCategories] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);

  const loadMenuData = async () => {
    const _categories = await LoadConcept("Categorías");
    const _menu = await getOffers();
    setMenu(_menu);
    setCategories(_categories);
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
  const filteredItems = menu.filter((item) => {
    const isInCategory = category === "Todo" || item.category.id === category;
    const isInSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details?.toLowerCase().includes(searchTerm.toLowerCase());
    return isInCategory && isInSearch;
  });

  return {
    searchTerm,
    category,
    categories,
    menu,
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
