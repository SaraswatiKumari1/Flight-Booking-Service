const {StatusCodes} = require('http-status-codes');
const { CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    }catch(error){
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let description = [];
            error.errors.forEach((err) => {
                description.push(err.message);
            });
            throw new AppError(description, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function destroyCity(id){ 
    try{
        const response = await cityRepository.destroy(id);
        return response;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to delete is not found", error.statusCode);
        }
        throw new AppError("Cannot delete the city", StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function updateCity(id, data){
    try{
        //console.log(`In service layer id: ${id} and data: ${JSON.stringify(data)}`);
        const response = await cityRepository.update(id, data);
        //console.log("Response in service layer: ", response);
        return response;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to update is not found", error.statusCode);
        }
        throw new AppError("Cannot update the city", StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function getCities(){ 
    try{
        const cities = await cityRepository.getAll();
        return cities;
    }catch(error){
        throw new AppError("Cannot fetch data of all cities", StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function getCity(id){ 
    try{
        const city = await cityRepository.get(id);
        return city;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested is not found", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the city", StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCities,
    getCity
}