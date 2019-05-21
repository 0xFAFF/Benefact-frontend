import moment from "moment";

export const formatTime = (time, format = "MMM D [at] h:mm A z") => {
  return moment.unix(time).format(format);
};
