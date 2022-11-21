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


    /* ------------------- Handle Register ------------------- */

    static async handleRegister({ name, email, password, phoneNumber, city, picture }) {
    
        const createdUser = await users.create({
            name,
            email,
            password,
            phoneNumber,
            city,
            picture
        });

        return createdUser;

    };

    /* ------------------- End Handle Register ------------------- */

};

module.exports = usersRepository;