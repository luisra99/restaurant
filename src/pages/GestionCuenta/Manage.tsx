import Meta from "@/base/components/Meta";
import useManage from "./useManage";
import CalculatorModal from "@/components/CalculatorModal";
import {
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import {
  closeAccount,
  deleteAccount,
  marchAccount,
  modifyAccountDetails,
} from "@/services/account";
import { Delete, Edit, MenuRounded, Print, Wallet } from "@mui/icons-material";
import { printAccount } from "@/services/printer";
import { useNavigate } from "react-router-dom";
import MenuGrid from "@/components/MenuGrid";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import useMenu from "../Menu/useMenu";
import OrdersList from "../Cuenta/components/OrdersList 2";
import { useState } from "react";
import ModifyAccount from "../Cuenta/components/ModifyAccount";
import TaxesManage from "../Cuenta/components/TaxesManage";
import PaymentModal from "../Payment/PaymentModal";

function Manage() {
  const [openMenu, setOpenMenu] = useState(null);

  const {
    open: openCalculator,
    setOpen: openProduct,
    idAccount,
    cuenta,
    quantity,
    setQuantity,
    negative,
    setNegative,
    handleClose,
    deleteOffer,
    modifyAccount,
    loadAccountData,
    setCuenta,
  } = useManage();
  const navegar = useNavigate();
  function handleClosePayment() {
    loadAccountData().then(() => setPaymentModal(false));
  }
  function handleCloseModal(account: any): void {
    setEditModal(false);
    setOpenTaxes(false);
    if (account) setCuenta(account);
  }
  const [openTaxes, setOpenTaxes] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleOpenMenu = (event: any) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseMenu = (event: any) => {
    setOpenMenu(null);
  };
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
      <Meta title="Configuración" />
      <Grid
        container
        sx={{ height: { xs: "calc(100vh - 58px)" } }}
        display={"flex"}
        flexDirection={{ sx: "row", md: "row-reverse" }}
        alignContent={"flex-start"}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            height: { xs: "calc(37vh - 29px);", md: "calc(100vh - 58px)" },
          }}
        >
          <Typography variant="body2" textAlign={"left"}>
            {`${cuenta?.table?.name} - ${cuenta?.totalQuantity} ${
              cuenta?.totalQuantity > 1 ? "productos" : "producto"
            } - $${cuenta?.finalPrice}`}
          </Typography>
          <Grid item xs={12} flexGrow={1} overflow={"auto"}>
            <Box
              justifyContent="center"
              width="100%"
              p={0}
              sx={{
                height: { xs: "calc(30vh - 29px)", md: "calc(90vh - 29px)" },
              }}
            >
              <OrdersList
                orders={cuenta?.orders}
                deleteOffer={deleteOffer}
                idAccount={idAccount}
                setProduct={openProduct}
                loadAccountData={loadAccountData}
                setNegative={setNegative}
              />
            </Box>
          </Grid>

          <Grid item xs={12} pt={1}>
            <Grid container spacing={1}>
              <Grid item xs={2} textAlign={"center"}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleOpenMenu}
                  size="small"
                >
                  <MenuRounded />
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  fullWidth
                  onClick={() => printAccount(cuenta?.id)}
                >
                  <Print />
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={() =>
                    closeAccount(cuenta?.id).then(() => navegar("/"))
                  }
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Cerrar
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={() =>
                    marchAccount(cuenta?.id).then(() => loadAccountData())
                  }
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Marchar
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={() => setPaymentModal(true)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Cobrar
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{ height: { xs: "calc(60vh - 29px)", md: "calc(96vh - 29px)" } }}
        >
          {" "}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onOpenModal={() => setOpen(true)}
            handleLetterClick={handleLetterClick}
            categoryLabel={categoryLabel}
            handleCategoryChange={handleCategoryChange}
          />
          <Box overflow={"auto"} sx={{ height: { xs: "calc(100% - 100px)" } }}>
            {categoryLabel && (
              <MenuGrid
                items={filteredItems}
                letterRefs={letterRefs}
                onSelect={(id: any) =>
                  modifyAccountDetails({
                    idAccount,
                    quantity: 1,
                    negative: false,
                    idOffer: id,
                  }).then(() => loadAccountData())
                }
                onSelectForCalc={(id: any) => openProduct(id)}
                onDelete={handleDelete}
                onEdit={(id: any) => {
                  setId(id);
                  setOpen(true);
                }}
              />
            )}
            {!categoryLabel && (
              <CategoryFilter
                category={category}
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Menu open={!!openMenu} anchorEl={openMenu} onClose={handleCloseMenu}>
        <MenuList>
          <MenuItem
            onClick={() => {
              setOpenMenu(null);
              setEditModal(true);
            }}
          >
            <ListItemIcon>
              <Edit color="warning" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenMenu(null);
              setOpenTaxes(true);
            }}
          >
            <ListItemIcon>
              <Wallet color="primary" />
            </ListItemIcon>
            <ListItemText>Impuestos y descuentos</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenMenu(null);
              deleteAccount(cuenta?.id).then(() => navegar("/"));
            }}
          >
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <CalculatorModal
        open={openCalculator}
        handleClose={handleClose}
        quantity={quantity}
        setQuantity={setQuantity}
        modifyAccount={modifyAccount}
        negative={negative}
        setNegative={setNegative}
      />
      <ModifyAccount
        handleClose={handleCloseModal}
        open={editModal}
        id={cuenta?.id}
      />
      <TaxesManage
        handleClose={handleCloseModal}
        open={openTaxes}
        idAccount={cuenta?.id}
        initialValue={cuenta?.taxDiscount}
      />
      <PaymentModal
        open={paymentModal}
        onClose={handleClosePayment}
        idAccount={cuenta?.id}
      />
    </>
  );
}

export default Manage;
