// CategorySelect.tsx
import { Field } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface CategorySelectProps {
  name: string;
  categories: any[];
  error?: string;
  touched?: boolean;
}

const CategorySelect = ({
  name,
  categories,
  error,
  touched,
}: CategorySelectProps) => (
  <FormControl fullWidth sx={{ marginBottom: 2 }}>
    <InputLabel htmlFor={name}>Categoría</InputLabel>
    <Field name={name} as={Select} variant="outlined" label="Categoría">
      {categories?.map((category, index) => (
        <MenuItem key={index} value={category.id}>
          {category.denomination}
        </MenuItem>
      ))}
    </Field>
    {touched && error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

export default CategorySelect;
