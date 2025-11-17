const CrudRepository = require('./crud-repository');
const { Flight, Airplanes, Airport, City} = require('../models');
const { Sequelize } = require('sequelize');
const db = require('../models');
const {addRowLockOnFlights} = require('./queries'); 

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

    async updateRemainingSeats(flightId, seats, dec = true){
        const transaction = await db.sequelize.transaction();
        try{
            await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(!flight){
            throw new Error("Flight not found");
        }
        
        if(+(dec)){
            await flight.decrement(
                'totalSeats',
                { by: seats },
                {transaction: transaction}
            );
            
        } else {
            await flight.increment(
                'totalSeats',
                { by: seats },
                {transaction: transaction}
            );    
        }
        await transaction.commit();
        return flight;
       
        }catch(error){
            await transaction.rollback();
            throw error;
        }
        
    }

} 


module.exports = FlightRepository;  