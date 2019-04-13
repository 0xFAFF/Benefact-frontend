class FetchError extends Error {
  constructor(status, statusText, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.date = new Date();
    this.info = { status, statusText };
  }
}

export default FetchError;
