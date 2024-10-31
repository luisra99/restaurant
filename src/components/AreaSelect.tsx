// AreaSelect.tsx
import { Field } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface AreaSelectProps {
  name: string;
  areas: any[];
  error?: string;
  touched?: boolean;
}

const AreaSelect = ({ name, areas, error, touched }: AreaSelectProps) => (
  <FormControl fullWidth sx={{ marginBottom: 2 }}>
    <InputLabel htmlFor={name}>Área</InputLabel>
    <Field name={name} as={Select} variant="outlined" label="Área">
      {areas?.map((area, index) => (
        <MenuItem key={index} value={area.id}>
          {area.denomination}
        </MenuItem>
      ))}
    </Field>
    {touched && error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

export default AreaSelect;
