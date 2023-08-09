const { sub_district_data } = require("../models");
const { Op } = require("sequelize");

class userRepository{

    /* ------------------- Handle Get Sub District Data ------------------- */

    static async handleGetSubDistrictData({ districtName }){

        if (districtName) {
            const searchByDistrictName = await sub_district_data.findAll({
                where: {
                    [Op.or]: [
                        { districtName: { [Op.like]: '%' + districtName + '%' } },
                    ]
                }
            });

            return searchByDistrictName;
        }

        const getSubDistrictData = await sub_district_data.findAll();

        return getSubDistrictData;

    };

    /* ------------------- End Handle Get Sub District Data ------------------- */


    /* ------------------- Handle Get Sub District Data By Id ------------------- */

    static async handleGetSubDistrictDataById({ id }){

        const getSubDistrictDataById = await sub_district_data.findOne({
            where: { id }
        });

        return getSubDistrictDataById;

    };

    /* ------------------- End Handle Get Sub District Data By Id ------------------- */

};

module.exports = userRepository;