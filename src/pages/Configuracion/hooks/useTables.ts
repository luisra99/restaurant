import { useEffect, useState } from "react";
import {
  deleteTable,
  getTable,
  listTables,
  postTables,
  putTables,
} from "@/services/table";

export const useTables = () => {
  const [tables, setTables] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    capacity: "",
    details: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadTables = async () => {
    const _tables = await listTables();
    setTables(_tables);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const addOrUpdateTable = async (table: any) => {
    if (editingIndex !== null) {
      await putTables(editingIndex, table);
      setEditingIndex(null);
    } else {
      await postTables(table);
    }
    loadTables();
    setInitialValues({ name: "", capacity: "", details: "" });
  };

  const deleteTableById = async (id: any) => {
    await deleteTable(id);
    loadTables();
  };

  const editTable = async (index: any) => {
    const table = await getTable(index);
    setInitialValues(table);
    setEditingIndex(index);
  };

  return {
    tables,
    initialValues,
    editingIndex,
    addOrUpdateTable,
    deleteTableById,
    editTable,
    setInitialValues,
  };
};
