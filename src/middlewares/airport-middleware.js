const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateAirportCreateRequest(req, res, next) {
    if (!req.body || !req.body.name) {
        ErrorResponse.message = "Error while creating airport";
        ErrorResponse.error = new AppError(["Name is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.code) {
        ErrorResponse.message = "Error while creating airport";
        ErrorResponse.error = new AppError(["Airport code is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.cityId) {
        ErrorResponse.message = "Error while creating airport";
        ErrorResponse.error = new AppError(["Airport city Id is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}
    

module.exports = {
    validateAirportCreateRequest
}