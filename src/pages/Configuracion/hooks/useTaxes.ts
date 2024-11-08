import { useEffect, useState } from "react";
import {
  alterTaxState,
  deleteTaxDiscount,
  getTaxById,
  getTaxes,
  postTax,
  putTax,
} from "@/services/taxes";

export const useTaxes = () => {
  const [taxes, setTaxes] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    percent: "",
    tax: "1",
  });

  const loadTaxes = async () => {
    const _taxes = await getTaxes();
    setTaxes(_taxes);
  };

  useEffect(() => {
    loadTaxes();
  }, []);

  const addOrUpdateTax = async (tax: any) => {
    if (editingIndex !== null) {
      await putTax(editingIndex, tax);
      setEditingIndex(null);
    } else {
      await postTax(tax);
    }
    loadTaxes();
  };

  const toggleActive = async (id: any) => {
    await alterTaxState(id);
    loadTaxes();
  };

  const deleteTax = async (id: any) => {
    await deleteTaxDiscount(id);
    loadTaxes();
  };

  const editTax = async (index: any) => {
    const tax = await getTaxById(index);
    setInitialValues({
      tax: `${tax.tax ? 1 : 0}`,
      name: tax.name,
      percent: tax.percent,
    });
    setEditingIndex(index);
  };

  return {
    taxes,
    initialValues,
    editingIndex,
    addOrUpdateTax,
    toggleActive,
    deleteTax,
    editTax,
    setInitialValues,
  };
};
