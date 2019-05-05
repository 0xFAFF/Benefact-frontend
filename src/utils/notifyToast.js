import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const notifyToast = (type, message, position = "top-center") => {
  const toasts = {
    success: () => toast.success(message, { position }),
    error: () => toast.error(message, { position }),
    warn: () => toast.warn(message, { position }),
    info: () => toast.info(message, { position })
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
