const CrudRepository = require('./crud-repository');
const { Flight, Airplanes, Airport, City} = require('../models');
const { Sequelize } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort)
    {
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplanes,
                    required: true,
                    as: 'airplaneDetails'
                },
                {
                    model: Airport,
                    required: true,
                    as : 'departureAirportDetails',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirportDetails.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                        as: 'fk_airport_cityId'
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as : 'arrivalAirportDetails',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirportDetails.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                        as: 'fk_airport_cityId'
                    }
                }
                
            ]
        });
        //console.log("Flights fetched from DB:", flights);
        return flights;
    }
} 


module.exports = FlightRepository;  