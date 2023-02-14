const createError = require("http-errors");
const ERROR_MESSAGE = "An error occured. Please try again"

const errorHandler = (fn) => async (request, response, next) => {
  try {
    await fn(request, response, next);
  } catch (error) {
    next(createError(500, ERROR_MESSAGE));
  }
};
module.exports = { errorHandler };
