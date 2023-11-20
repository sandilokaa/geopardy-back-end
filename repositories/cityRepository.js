const { Cities } = require("../models");

class CityRepository {

    /* ------------------- Handle Create City ------------------- */

    static async handleCreateCity({ adminId, cityName }) {

        const handleCreatedCity = Cities.create({ adminId, cityName });

        return handleCreatedCity;

    };

    /* ------------------- End Handle Create City ------------------- */

    /* ------------------- Handle Get City ------------------- */

    static async handleGetCity({ cityName }) {
    
        const handleGetCity = await Cities.findOne({
            where: { cityName }
        });

        return handleGetCity;
        
    };

    /* ------------------- End Handle Get City ------------------- */

};

module.exports = CityRepository;