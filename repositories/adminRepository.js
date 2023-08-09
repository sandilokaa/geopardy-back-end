const { 
    users, 
    sub_district_data, 
    risk_levels, 
    results_data 
} = require("../models");

class adminRepository {

    /* ------------------- Handle Get Admin By Id ------------------- */

    static async handleGetAdminById({ id }) {

        const getAdminById = await users.findOne({
            where: { id }
        });

        return getAdminById;

    };

    /* ------------------- End Handle Get Admin By Id ------------------- */
    
    
    /* ------------------- Handle Admin Update Profile ------------------- */

    static async handleAdminUpdateProfile({ id, name, email, phoneNumber, city, picture }) {

        const updatedAdminProfile = await users.update({
            name,
            email,
            phoneNumber,
            city,
            picture
            } , {
                where: { id }
            }
        );

        return updatedAdminProfile;

    };

    /* ------------------- End Handle Admin Update Profile ------------------- */


    /* ------------------- Handle Create Risk Level ------------------- */

    static async handleCreateRiskLevel({ riskLevel }) {
    
        const createdRiskLevel = await risk_levels.create({ riskLevel });

        return createdRiskLevel;

    };

    /* ------------------- End Handle Create Risk Level ------------------- */


    /* ------------------- Handle Create Sub District ------------------- */

    static async handleCreateSubDistrict({ userId, districtName, latitude, longitude, riskLevel, description, picture }) {
    
        const createdSubDistrict = await sub_district_data.create({
            userId,
            districtName,
            latitude,
            longitude,
            riskLevel,
            description,
            picture
        });

        return createdSubDistrict;

    };

    /* ------------------- End Handle Create Sub District ------------------- */


    /* ------------------- Handle Update Sub District ------------------- */

    static async handleUpdateSubDistrict({ id, districtName, latitude, longitude, riskLevel, description, picture }) {
    
        const updatedSubDistrictData = await sub_district_data.update({
            districtName,
            latitude,
            longitude,
            riskLevel,
            description,
            picture
        },
        {
            where: { id }
        });

        return updatedSubDistrictData;

    };

    /* ------------------- End Handle Update Sub District ------------------- */

};

module.exports = adminRepository;