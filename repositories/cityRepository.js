const { Cities } = require("../models");

class CityRepository {

    /* ------------------- Handle Create City ------------------- */

    static async handleCreateCity({ adminId, cityName }) {

        const handleCreatedCity = Cities.create({ adminId, cityName });

        return handleCreatedCity;

    };

    /* ------------------- End Handle Create City ------------------- */


    /* ------------------- Handle Get One City ------------------- */

    static async handleGetCity({ cityName }) {
    
        const handleGetCity = await Cities.findOne({
            where: { cityName }
        });

        return handleGetCity;
        
    };

    /* ------------------- End Handle Get One City ------------------- */


    /* ------------------- Handle Get All City ------------------- */

    static async handleGetAllCity({ cityName }){

        const getedAllCity = await Cities.findAll({
            where: { cityName }
        });

        return getedAllCity;

    };

    /* ------------------- Handle Get All City ------------------- */

};

module.exports = CityRepository;