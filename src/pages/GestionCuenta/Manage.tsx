import Meta from "@/base/components/Meta";
import useManage from "./useManage";
import CalculatorModal from "@/components/CalculatorModal";
import {
  Box,
  Button,
  Divider,
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
import { Delete, Edit, Wallet } from "@mui/icons-material";
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
import { fToNow } from "@/base/utils/format-time";
import PropinaModal from "../Payment/PropinaModal";

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
  function handleClosePropina() {
    loadAccountData().then(() => setPropinaModal(false));
  }
  function handleCloseModal(account: any): void {
    setEditModal(false);
    setOpenTaxes(false);
    if (account) setCuenta(account);
  }
  const [openTaxes, setOpenTaxes] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [propinaModal, setPropinaModal] = useState(false);
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
          overflow={"auto"}
          sx={{
            height: { xs: "calc(40vh + 2px);", md: "calc(100vh - 68px)" },
            padding: { xs: 0, md: 1.5 },
          }}
        >
          <Typography
            variant="body2"
            textAlign={"left"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            <b style={{ fontWeight: 900 }}>{`${cuenta?.table?.name} `}</b>
            <i>{`( $${cuenta?.finalPrice} ) - ${cuenta?.type?.denomination}`}</i>{" "}
            (Abierta
            {` ${fToNow(cuenta?.created)})`}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }} gap={2}>
            <Typography
              variant="body2"
              textAlign={"left"}
              fontSize={{ xs: "14px", md: "17px" }}
            >
              Dependiente: {`${cuenta.dependent ?? "Sin asignar"}`}
            </Typography>
            <Typography
              variant="body2"
              textAlign={"left"}
              fontSize={{ xs: "14px", md: "17px" }}
            >
              Personas: {`${cuenta?.people ?? "No especificado"}`}
            </Typography>
          </Box>
          <Divider sx={{ m: 0.3 }} />
          {!!cuenta?.orders?.length && (
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                variant="body2"
                textAlign={"left"}
                fontSize={{ xs: "14px", md: "17px" }}
                fontWeight={700}
              >
                Productos:{" "}
                {!!cuenta?.totalQuantity
                  ? cuenta?.totalQuantity
                  : "Sin productos"}
              </Typography>
              <Typography
                variant="body2"
                textAlign={"left"}
                fontSize={{ xs: "14px", md: "17px" }}
                fontWeight={700}
              >
                Subtotal: ${cuenta?.totalPrice}
              </Typography>
              <Typography
                variant="body2"
                textAlign={"left"}
                fontSize={{ xs: "14px", md: "17px" }}
                fontWeight={700}
              >
                {Number(cuenta?.finalPrice ?? 0) -
                  Number(cuenta?.totalPaid ?? 0) <
                0
                  ? `Vuelto: $${Math.abs(
                      Number(cuenta?.finalPrice ?? 0) -
                        Number(cuenta?.totalPaid ?? 0)
                    ).toFixed(2)}`
                  : `A pagar: $${(
                      Number(cuenta?.finalPrice ?? 0) -
                      Number(cuenta?.totalPaid ?? 0)
                    ).toFixed(2)}`}
              </Typography>
            </Box>
          )}
          <Divider sx={{ m: 0.3 }} />
          {!!cuenta?.propina && (
            <Typography
              variant="body2"
              textAlign={"left"}
              fontSize={{ xs: "14px", md: "17px" }}
            >
              Propina guardada: ${cuenta?.propina}
            </Typography>
          )}
          <Grid
            item
            xs={12}
            flexGrow={1}
            overflow={"auto"}
            sx={{
              height: { xs: "calc(75% - 62px)", md: "calc(70% - 62px)" },
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
          </Grid>

          <Grid item xs={12} pt={0.5} paddingBottom={"8px"}>
            <Grid container spacing={0.7} justifyContent={"center"}>
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="error"
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
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  fullWidth
                  onClick={() => printAccount(cuenta?.id)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Recibo
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
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
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  onClick={() => setPaymentModal(true)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Cobrar
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  fullWidth
                  onClick={() => {
                    deleteAccount(cuenta?.id).then(() => navegar("/"));
                  }}
                >
                  <Delete />
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  fullWidth
                  onClick={() => setOpenTaxes(true)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Impuestos
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={() => setEditModal(true)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Editar
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  onClick={() => setPropinaModal(true)}
                >
                  <Typography variant="subtitle1" letterSpacing={0.7}>
                    Propina
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent={"center"}
              paddingTop={1}
            ></Grid>
          </Grid>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {cuenta?.mappedTaxsDiscounts?.length ? (
              <>
                <Typography
                  variant="body2"
                  textAlign={"left"}
                  fontSize={{ xs: "14px", md: "18px" }}
                >
                  Impuestos y descuentos:
                </Typography>
                {cuenta?.mappedTaxsDiscounts?.map((taxDiscount: any) => {
                  return (
                    <Typography
                      key={taxDiscount.denomination}
                      variant="caption"
                      p={1}
                    >
                      {`${taxDiscount.name} ${taxDiscount.tax ? "+" : "-"}${
                        taxDiscount.percent
                      }% ($${taxDiscount.amount.toFixed(2)})`}
                    </Typography>
                  );
                })}
              </>
            ) : (
              <Typography
                variant="body2"
                textAlign={"left"}
                fontSize={{ xs: "14px", md: "20px" }}
              >
                No hay impuestos ni descuentos aplicados
              </Typography>
            )}

            {cuenta?.divisaAmount?.length ? (
              <>
                <Typography
                  variant="body1"
                  textAlign={"left"}
                  fontSize={{ xs: "14px", md: "18px" }}
                >
                  Divisas:
                </Typography>
                {cuenta?.divisaAmount?.map((divisa: any) => {
                  return (
                    <Typography
                      key={divisa.denomination}
                      variant="caption"
                      p={1}
                    >
                      {`${divisa.denomination}  ($${divisa.amount})`}
                    </Typography>
                  );
                })}
              </>
            ) : (
              <Typography
                variant="body2"
                textAlign={"left"}
                fontSize={{ xs: "14px", md: "20px" }}
              >
                No hay divisas configuradas
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ height: { xs: "calc(60vh - 65px)", md: "calc(96vh - 29px)" } }}
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onOpenModal={() => setOpen(true)}
            handleLetterClick={handleLetterClick}
            categoryLabel={categoryLabel}
            handleCategoryChange={handleCategoryChange}
          />
          <Box overflow={"auto"} sx={{ height: { xs: "calc(100% - 100px)" } }}>
            {(!categoryLabel || category === "Reciente") && (
              <CategoryFilter
                category={category}
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            )}
            {(categoryLabel || category === "Reciente") && (
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
      <PropinaModal
        open={propinaModal}
        amount={Math.abs(
          Number(cuenta?.finalPrice ?? 0) - Number(cuenta?.totalPaid ?? 0)
        ).toFixed(2)}
        onClose={handleClosePropina}
        idAccount={cuenta?.id}
      />
    </>
  );
}

export default Manage;
