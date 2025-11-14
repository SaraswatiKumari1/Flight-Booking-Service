const {StatusCodes} = require("http-status-codes");
const {AirportService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/**
 * POST: /airports
 * req-body: {name: "JFK International", code: "JFK", address: "Queens, NY 11430", cityId: 1}
 */
async function createAirport(req, res){
    try{
        const airport = await AirportService.createAirport({name: req.body.name, code: req.body.code, address: req.body.address,cityId: req.body.cityId});
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /airports
 * req-body: {}
 */
async function getAirports(req, res){
    try{
        const airports = await AirportService.getAirports(); 
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /airports/:id
 * req-body: {}
 */
async function getAirport(req, res){
    try{
        const airport = await AirportService.getAirport(req.params.id); 
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE: /airports
 * req-body: {}
 */
async function destroyAirport(req, res){
    try{
        const airport = await AirportService.destroyAirport(req.params.id); 
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * UPDATE: /airports
 * req-body: {modelNumber:airbus380, capacity:900}
 */
async function updateAirport(req, res){
    try{
        const airport = await AirportService.updateAirport(req.params.id, req.body); 
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}