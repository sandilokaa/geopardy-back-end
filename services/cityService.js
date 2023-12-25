const cityRepository = require("../repositories/cityRepository");
const cityDetailRepository = require("../repositories/cityDetailRepository");

class CityService {

    /* ------------------- Handle Create City ------------------- */

    static async handleCreateCity({ adminId, cityName, cityId }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!cityName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "City is required!",
                    data: {
                        createdCity: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getCity = await cityRepository.handleGetCity({ cityName });

            if (getCity?.cityName) {

                return {
                    status: false,
                    status_code: 400,
                    message: "City already available!",
                    data: {
                        createdCity: null,
                    },
                };

            } else {

                const handleCreatedCity = await cityRepository.handleCreateCity({ adminId, cityName });
                const handleCreatedDetailCity = await cityDetailRepository.handleCreateCityDetail({ adminId: handleCreatedCity.adminId, cityId:handleCreatedCity.id });

                return {
                    status: true,
                    status_code: 201,
                    message: "New city created successfully (:",
                    data: {
                        createdCity: handleCreatedCity,
                        createdDetailCity: handleCreatedDetailCity
                    },
                };
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    createdCity: null,
                },
            };

        }

    };

    /* ------------------- End Handle Create City ------------------- */


    /* ------------------- Handle Get All City ------------------- */

    static async handleGetAllCity({ cityName }){

        try {
            
            const getedAllCity = await cityRepository.handleGetAllCity({ cityName });

            return {
                status: true,
                status_code: 201,
                message: "Data displayed successfully(:",
                data: {
                    getedAllCity: getedAllCity,
                },
            };

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getedAllCity: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get All City ------------------- */

};

module.exports = CityService;