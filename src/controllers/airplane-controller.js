const {StatusCodes} = require("http-status-codes");
const {AirplaneService} = require("../services");
const { error } = require("winston");

async function createAirplane(req, res){
    try{
        const airplane = await AirplaneService.createAirplane({modelNumber: req.body.modelNumber, capacity: req.body.capacity});
        return res.status(StatusCodes.CREATED).json({
            data: airplane,
            success: true,
            message: "Successfully created an airplane",
            error: {}
        });
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Error while creating airplane",
            error: error
        });
    }
}

module.exports = {
    createAirplane
}