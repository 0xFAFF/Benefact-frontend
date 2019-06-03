import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

export const notifyToast = (
  type: "success" | "error" | "warn" | "info",
  message?: string,
  options?: any
) => {
  toast.configure({
    autoClose: 3500,
    draggable: false,
    position: "top-center"
  });
  const toasts = {
    success: () =>
      toast.success(message, {
        ...options,
        className: "toast-success",
        progressClassName: "toast-success-progress"
      }),
    error: () =>
      toast.error(message, {
        ...options,
        className: "toast-error",
        progressClassName: "toast-error-progress"
      }),
    warn: () =>
      toast.warn(message, {
        ...options,
        className: "toast-warn",
        progressClassName: "toast-warn-progress"
      }),
    info: () =>
      toast.info(message, {
        ...options,
        className: "toast-info",
        progressClassName: "toast-info-progress"
      })
  };
  return toasts[type]();
};

notifyToast.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warn", "info"]),
  message: PropTypes.string,
  position: PropTypes.oneOf([
    "top-right",
    "top-left",
    "top-center",
    "bottom-right",
    "bottom-left",
    "bottom-center"
  ])
};

export default notifyToast;
