const { Admins } = require("../models");

class AuthRepository {

    /* ------------------- Handle Get User By Email ------------------- */

    static async handleGetUserByEmail({ email }) {
        
        const getUserByEmail = await Admins.findOne({
            where : { email }
        });

        return getUserByEmail;

    };

    /* ------------------- End Handle Get User By Email ------------------- */


    /* ------------------- Handle Admin Register ------------------- */

    static async handleAdminRegister({ name, email, password, phoneNumber }) {
    
        const handleAdminRegistered = await Admins.create({
            name,
            email,
            password,
            phoneNumber
        });

        return handleAdminRegistered;

    };

    /* ------------------- End Handle Admin Register ------------------- */


};

module.exports = AuthRepository;