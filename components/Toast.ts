import { toast } from "sonner";

export const ShowToast = (
  message: string,
  type: "success" | "warning" | "error"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;

    default:
      toast.success(message);
      break;
  }
};
