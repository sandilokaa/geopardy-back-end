const { CityDetails } = require("../models");

class CityDetailRepository {

    /* ------------------- Handle Create City Detail ------------------- */

    static async handleCreateCityDetail({
        adminId,
        cityId
    }) {

        const handleCreatedCityDetail = CityDetails.create({
            adminId,
            cityId
        });

        return handleCreatedCityDetail;

    };

    /* ------------------- End Handle Create City Detail ------------------- */


    /* ------------------- Handle Update City Detail ------------------- */

    static async handleUpdateCityDetail({
        id,
        riskLevelId,
        latitude,
        longitude,
        description,
        picture
    }) {

        const handleUpdatedCityDetail = CityDetails.update({
            riskLevelId,
            latitude,
            longitude,
            description,
            picture
        }, {
            where: { id }
        });

        return handleUpdatedCityDetail;

    };

    /* ------------------- End Handle Update City Detail ------------------- */


    /* ------------------- Handle Get City Detail By Id ------------------- */

    static async handleGetCityDetailById({ id }) {

        const handleGetCityDetailById = CityDetails.findOne({
            where: { id }
        });

        return handleGetCityDetailById;

    }

    /* ------------------- End Handle Get City Detail By Id ------------------- */


    /* ------------------- Handle Get City By City Id ------------------- */

    static async handleGetCityByCityId({ cityId }){

        const getedCityByCityId = CityDetails.findOne({
            where: { cityId }
        });

        return getedCityByCityId;

    };

    /* ------------------- End Handle Get City By City Id ------------------- */


};

module.exports = CityDetailRepository;