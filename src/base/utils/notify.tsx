import { enqueueSnackbar } from "notistack";

export const notify = (
  message: string,
  variant?: "error" | "success" | "warning"
) => {
  enqueueSnackbar(message, {
    autoHideDuration: 3000,
    variant: variant ?? "success",
    anchorOrigin: { horizontal: "center", vertical: "top" },
  });
};
