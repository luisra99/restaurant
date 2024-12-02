import { Dialog } from "@mui/material";
import useMenu from "./useMenu";
import SearchBar from "@/components/SearchBar";
import AddMenuOffer from "../Oferta/MenuOfferForm";
import MenuGrid from "@/components/MenuGrid";
import CategoryFilter from "@/components/CategoryFilter";
const Menu = ({ setProduct }: { setProduct?: (args: any) => void }) => {
  const {
    searchTerm,
    category,
    categories,
    filteredItems,
    open,
    id,
    categoryLabel,
    letterRefs,
    handleLetterClick,
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
        handleLetterClick={handleLetterClick}
        categoryLabel={categoryLabel}
        handleCategoryChange={handleCategoryChange}
      />

      {!categoryLabel && (
        <CategoryFilter
          category={category}
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {categoryLabel && (
        <MenuGrid
          items={filteredItems}
          letterRefs={letterRefs}
          onSelect={(id: any) => setProduct?.(id)}
          onDelete={handleDelete}
          onEdit={(id: any) => {
            setId(id);
            setOpen(true);
          }}
        />
      )}
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
