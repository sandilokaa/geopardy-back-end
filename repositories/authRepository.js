const { users, forgot_passwords } = require("../models");

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

    static async handleRegister({ name, email, password, phoneNumber, city, picture, role }) {
    
        const createdUser = await users.create({
            name,
            email,
            password,
            phoneNumber,
            city,
            picture,
            role
        });

        return createdUser;

    };

    /* ------------------- End Handle Register ------------------- */


    /* ------------------- Handle Check Forgot Password ------------------- */

    static async handleCheckForgotPassword({ userId }) {
    
        const checkedForgotPassword = await forgot_passwords.findOne({
            where: { userId }
        });

        return checkedForgotPassword;

    };

    /* ------------------- End Handle Check Forgot Password ------------------- */


    /* ------------------- Handle Forgot Password ------------------- */

    static async handleForgotPassword({ userId, otp }) {
    
        const createdForgotPassword = await forgot_passwords.create({
            userId,
            otp
        });

        return createdForgotPassword;

    };

    /* ------------------- End Handle Forgot Password ------------------- */

};

module.exports = usersRepository;