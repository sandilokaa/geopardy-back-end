const { users } = require("../models");

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

};

module.exports = adminRepository;