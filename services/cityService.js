const cityRepository = require("../repositories/cityRepository");

class CityService {

    /* ------------------- Handle Create City ------------------- */

    static async handleCreateCity({ adminId, cityName }) {

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

                return {
                    status: true,
                    status_code: 201,
                    message: "New city created successfully (:",
                    data: {
                        createdCity: handleCreatedCity,
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

};

module.exports = CityService;