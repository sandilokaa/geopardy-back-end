const { users } = require("../models");

class usersRepository {

    /* ------------------- Handle Get User By Email ------------------- */

    static async handleGetUserByEmail({ email }) {
        
        const getUserByEmail = await users.findOne({
            where : { email }
        });

        return getUserByEmail;

    };

    /* ------------------- End Handle Get User By Email ------------------- */


    /* ------------------- Handle Admin Register ------------------- */

    static async handleAdminRegister({ name, email, password, phoneNumber }) {
    
        const handleAdminRegistered = await users.create({
            name,
            email,
            password,
            phoneNumber
        });

        return handleAdminRegistered;

    };

    /* ------------------- End Handle Admin Register ------------------- */


};

module.exports = usersRepository;