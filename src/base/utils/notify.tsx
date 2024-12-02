import { enqueueSnackbar } from "notistack";

export const notify = (
  message: string,
  variant?: "error" | "success" | "warning" | "vibrateOnly"
) => {
  navigator.vibrate(variant === "error" ? 500 : 60);
  !(variant == "vibrateOnly") &&
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: variant ?? "success",
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
};
