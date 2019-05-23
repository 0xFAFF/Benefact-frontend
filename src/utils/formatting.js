import moment from "moment";

const formatTime = time => moment.unix(time).format("MMM D [at] h:mm A z");

export { formatTime };
