const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body || !req.body.flightNumber) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Flight number is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.airplaneId) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Airplane ID is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.departureAirportId) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Departure airport ID is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.arrivalAirportId) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Arrival airport ID is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.arrivalTime) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Arrival time is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.departureTime) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Departure time is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body || !req.body.price) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Price is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    
    if (!req.body || !req.body.totalSeats) {
        ErrorResponse.message = "Error while creating flight";
        ErrorResponse.error = new AppError(["Total seats is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}
    
function validateUpdateSeatsRequest(req, res, next) {
    if (!req.body || !req.body.seats) {
        ErrorResponse.message = "Error while updating flight";
        ErrorResponse.error = new AppError(["Seats is not found"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}