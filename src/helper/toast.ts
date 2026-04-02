import toast from "react-hot-toast";

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showErrorToast(message: string) {
  toast.error(message);
}
