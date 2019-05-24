import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const notifyToast = (type, message, position = "top-center") => {
  const toasts = {
    success: () =>
      toast.success(message, {
        position,
        className: "toast-success",
        progressClassName: "toast-success-progress"
      }),
    error: () =>
      toast.error(message, {
        position,
        className: "toast-error",
        progressClassName: "toast-error-progress"
      }),
    warn: () =>
      toast.warn(message, {
        position,
        className: "toast-warn",
        progressClassName: "toast-warn-progress"
      }),
    info: () =>
      toast.info(message, {
        position,
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
