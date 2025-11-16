const {StatusCodes} = require("http-status-codes");
const {FlightService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/**
 * POST: /airports
 * req-body: {
 *   flightNumber: 'AI202',
 *   airplaneId: 1,
 *   departureAirportId: 2,
 *   arrivalAirportId: 3,
 *   arrivalTime: '11:00:00',
 *   departureTime: '06:00:00',
 *   price: 500,
 *   boardingGate: 'A1',
 *   totalSeats: 180
 * }
 */
async function createFlight(req, res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber, 
            airplaneId: req.body.airplaneId, 
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req, res){
    try{
        const flights = await FlightService.getAllFlights(req.query);  
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}  

/**
 * GET: /flights/:id
 * req-body: {}
 */
async function getFlight(req, res){
    try{
        const flight = await FlightService.getFlight(req.params.id); 
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateSeats(req, res) {
    try{
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
