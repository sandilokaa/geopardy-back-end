const { users, risk_levels } = require("../models");

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

};

module.exports = adminRepository;