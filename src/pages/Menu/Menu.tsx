import { Dialog } from "@mui/material";
import useMenu from "./useMenu";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MenuGrid from "@/components/MenuGrid";
import AddMenuOffer from "../Oferta/MenuOfferForm";

const Menu = ({ setProduct }: { setProduct?: (args: any) => void }) => {
  const {
    searchTerm,
    category,
    categories,
    filteredItems,
    open,
    id,
    setOpen,
    setId,
    loadMenuData,
    handleDelete,
    handleSearchChange,
    handleCategoryChange,
  } = useMenu();

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onOpenModal={() => setOpen(true)}
      />
      <CategoryFilter
        category={category}
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <MenuGrid
        items={filteredItems}
        onSelect={(id) => setProduct?.(id)}
        onDelete={handleDelete}
        onEdit={(id) => {
          setId(id);
          setOpen(true);
        }}
      />
      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <AddMenuOffer
          id={id}
          handleClose={() => {
            setOpen(false);
            setId(null);
            loadMenuData();
          }}
        />
      </Dialog>
    </>
  );
};

export default Menu;
