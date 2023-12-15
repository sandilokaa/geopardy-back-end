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
                    riskLevelId = handleGetedUserById.riskLevelId;
                }

                if (!latitude){
                    latitude = handleGetedUserById.latitude;
                }

                if (!longitude){
                    longitude = handleGetedUserById.longitude;
                }

                if (!description){
                    description = handleGetedUserById.description;
                }

                if (!picture){
                    picture = handleGetedUserById.picture;
                } else {
                    fileRemove(handleGetedUserById.picture)
                }

            }

            const updatedCityDetail = cityDetailRepository.handleUpdateCityDetail({
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