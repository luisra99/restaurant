// ImageUpload.tsx
import { Avatar, Box, Button, FormControl, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { CameraAlt } from "@mui/icons-material";

interface ImageUploadProps {
  preview: string | null;
  setPreview: (value: string | null) => void;
  setFieldValue: (field: string, value: any) => void;
  error?: string;
  touched?: boolean;
}

const ImageUpload = ({
  preview,
  setPreview,
  setFieldValue,
  error,
  touched,
}: ImageUploadProps) => (
  <FormControl fullWidth sx={{ marginBottom: 2, flexGrow: 1 }}>
    <Box sx={{ width: "100%", height: 100, marginBottom: 2 }}>
      {preview ? (
        <Avatar
          src={preview}
          alt="Vista previa"
          variant="rounded"
          sx={{ width: "100%", height: 120 }}
        />
      ) : (
        <Avatar
          alt="Vista previa"
          variant="rounded"
          sx={{ width: "100%", height: 120 }}
        >
          <CameraAlt />
        </Avatar>
      )}
    </Box>
    <Button
      variant="contained"
      component="label"
      fullWidth
      startIcon={<PhotoCamera />}
      sx={{ marginBottom: 1 }}
    >
      Subir foto
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setFieldValue("image", file);
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
          } else {
            setPreview(null);
          }
        }}
      />
    </Button>
    {touched && error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

export default ImageUpload;
