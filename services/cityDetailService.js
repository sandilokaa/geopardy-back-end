const cityDetailRepository = require("../repositories/cityDetailRepository");
const fileRemove = require("../utils/fileRemove");

class CityDetailService {

    /* ------------------- Handle Update City Detail ------------------- */

    static async handleUpdateCityDetail({
        id,
        riskLevelId,
        latitude,
        longitude,
        description,
        picture
    }) {

        try {

            const getedCityDetailById = await cityDetailRepository.handleGetCityDetailById({ id });

            if (getedCityDetailById.id == id) {

                if (!riskLevelId){
                    riskLevelId = getedCityDetailById.riskLevelId;
                }

                if (!latitude){
                    latitude = getedCityDetailById.latitude;
                }

                if (!longitude){
                    longitude = getedCityDetailById.longitude;
                }

                if (!description){
                    description = getedCityDetailById.description;
                }

                if (!picture){
                    picture = getedCityDetailById.picture;
                } else {
                    fileRemove(getedCityDetailById.picture)
                }

            }

            const updatedCityDetail = await cityDetailRepository.handleUpdateCityDetail({
                id,
                riskLevelId,
                latitude,
                longitude,
                description,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Data completed successfully(:",
                data: {
                    updatedCityDetail: updatedCityDetail,
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedCityDetail: null,
                },
            };

        }

    }

    /* ------------------- End Handle Update City Detail ------------------- */

};

module.exports = CityDetailService;