const CrudRepository = require('./crud-repository');
const { Airplanes } = require('../models');

class AirplaneRepository extends CrudRepository {
    constructor(){
        super(Airplanes);
    }
} 
module.exports = AirplaneRepository;      

