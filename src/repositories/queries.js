function addRowLockOnFlights(flightId) {
    return `Select * from "Flights" where id = ${flightId} FOR UPDATE;`
}

module.exports = {
    addRowLockOnFlights
}