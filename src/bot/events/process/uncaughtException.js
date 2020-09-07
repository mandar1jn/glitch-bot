const path = require('path');
const errorHandler = require(path.resolve('src/bot/handlers/error.js'))

module.exports = async (process, error) => {
    errorHandler.uncaughtException(error);
}