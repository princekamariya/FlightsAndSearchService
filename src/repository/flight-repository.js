const { Op, where } = require("sequelize");
const { Flights } = require("../models/index");

class FlightRepository {
    #createFilter(data) {
        let filter = {};
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }

        if (data.minPrice && data.maxPrice) {
            Object.assign(filter, {
                [Op.and]: [
                    { price: { [Op.lte]: data.maxPrice } },
                    { price: { [Op.gte]: data.minPrice } },
                ],
            });
        }

        return filter;
    }

    async createFlight(data) {
        try {
            const flight = await Flight.create(data);
            return flight;
        } catch (error) {
            console.log("Somthing went wrong in the repository layer");
            throw { error };
        }
    }

    async getAllFlights(filter) {
        try {
            const filterObject = this.#createFilter(filter);
            const flights = await Flights.findAll({
                where: filterObject,
            });
            return flights;
        } catch (error) {
            console.log("Somthing went wrong in the repository layer");
            throw { error };
        }
    }

    async updateFlight(flightId, data) {
        try {
            await Flights.update(data, {
                where: {
                    id: flightId,
                },
            });
        } catch (error) {
            console.log("Somthing went wrong in the repository layer");
            throw { error };
        }
    }
}

module.exports = FlightRepository;
