// hooks/useMenu.tsx
import { useState, useEffect } from "react";
import { getOffers, deleteOffer, getRecent } from "@/services/menu";
import { getConcepts } from "@/services/concept";

const useMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
    setMenu(_menu);
    setCategories(_categories);
    setRecents(_recent);
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
  const filteredItems =
    category === "Reciente"
      ? searchTerm.length
        ? menu.filter((item) => {
            const isInSearch =
              item.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase()) ||
              item.details?.toLowerCase().includes(searchTerm?.toLowerCase());
            return isInSearch;
          })
        : recents
      : menu.filter((item) => {
          const isInCategory = item.category.id === category;
          const isInSearch =
            item.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            item.description
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            item.details?.toLowerCase().includes(searchTerm?.toLowerCase());
          return isInCategory && isInSearch;
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
