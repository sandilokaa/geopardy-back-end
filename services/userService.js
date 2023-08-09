const userRepository = require("../repositories/userRepository");

class userService {

    /* ------------------- Handle Get Sub District Data ------------------- */

    static async handleGetSubDistrictData({ districtName }){

        try {
            
            const getSubDistrictData = await userRepository.handleGetSubDistrictData({ districtName });

            return {
                status: true,
                status_code: 200,
                message: "Data kecamatan berhasil ditampilkan",
                data: {
                    subDistrictData: getSubDistrictData,
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    subDistrictData: null
                },
            };
        }

    };

    /* ------------------- End Handle Get Sub District Data ------------------- */


    /* ------------------- Handle Get Sub District Data By Id ------------------- */

    static async handleGetSubDistrictDataById({ id }){

        try {
            
            const getSubDistrictDataById = await userRepository.handleGetSubDistrictDataById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data kecamatan berhasil ditampilkan",
                data: {
                    subDistrictData: getSubDistrictDataById,
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    subDistrictData: null
                },
            };
        }

    };

    /* ------------------- End Handle Get Sub District Data By Id ------------------- */

};

module.exports = userService;