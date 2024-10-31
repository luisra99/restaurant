// FieldWithError.tsx
import { Field } from "formik";
import { TextField } from "@mui/material";

interface FieldWithErrorProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  error?: string;
  touched?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FieldWithError = ({
  name,
  label,
  type = "text",
  multiline = false,
  rows,
  error,
  touched,
  inputRef,
  onKeyDown,
}: FieldWithErrorProps) => (
  <>
    <Field
      name={name}
      as={TextField}
      fullWidth
      sx={{ marginBottom: 2 }}
      label={label}
      type={type}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      error={touched && Boolean(error)}
      helperText={touched && error}
      inputRef={inputRef}
      onKeyDown={onKeyDown}
    />
  </>
);

export default FieldWithError;
