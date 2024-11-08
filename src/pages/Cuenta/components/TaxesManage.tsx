import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Dialog,
  Button,
} from "@mui/material";
import { getTaxes } from "@/services/taxes";
import { modifyTaxDiscount } from "@/services/account";

const TaxesManage = ({
  initialValue,
  idAccount,
  handleClose,
  open,
}: {
  initialValue: string[];
  idAccount: string;
  open: boolean;
  handleClose: any;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [concepts, setConcepts] = useState<any[]>([]);

  const Load = async () => {
    const _concepts: any[] = await getTaxes();
    setConcepts(
      _concepts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  };

  const toggleActivo = (id: any) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    Load();
  }, []);
  useEffect(() => {
    if (initialValue) {
      setSelected(initialValue);
    }
  }, [initialValue]);

  return (
    <Dialog fullScreen open={open} onClose={() => handleClose()}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Modificar impuestos y descuentos de la cuenta
        </Typography>

        {/* Tabla de impuestos/descuentos */}
        <Paper sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Activo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="center">Porcentaje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {concepts?.map((impuesto, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(impuesto.id)}
                      onChange={() => toggleActivo(impuesto.id)}
                    />
                  </TableCell>
                  <TableCell>{impuesto.name}</TableCell>
                  <TableCell>
                    {impuesto.tax ? "Impuesto" : "Descuento"}
                  </TableCell>
                  <TableCell align="center">{impuesto.percent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Box display={"flex"} justifyContent={"space-between"} padding={1}>
          <Button variant="outlined" onClick={() => handleClose()}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              modifyTaxDiscount(idAccount, selected).then((account) =>
                handleClose(account)
              )
            }
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default TaxesManage;
