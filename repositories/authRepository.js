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


    /* ------------------- Handle Check Forgot Password ------------------- */

    static async handleCheckOTPForgotPassword({ otp }) {
    
        const checkedForgotPassword = await forgot_passwords.findOne({
            where: { otp }
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


    /* ------------------- Handle Forgot Password ------------------- */

    static async handleUpdateForgotPassword({ userId, otp }) {
    
        const updatedForgotPassword = await forgot_passwords.update({
            otp
        }, {
            where: { userId }
        });

        return updatedForgotPassword;

    };

    /* ------------------- End Handle Forgot Password ------------------- */


    /* ------------------- Handle Verify Forgot Password ------------------- */

    static async handleVerifyForgotPassword({ userId, otp, isVerified }) {

        const updatedVerifryPassword = await forgot_passwords.update({
            isVerified: true
        }, {
            where: { otp }
        });

        return updatedVerifryPassword;

    };

    /* ------------------- End Handle Verify Forgot Password ------------------- */


    /* ------------------- Handle Reset Forgot Password ------------------- */

    static async handleResetPassword({ email, password }) {

        const updatedPassword = await users.update({
            password
        }, {
            where: {
                email
            }
        });

        return updatedPassword;
    };

    /* ------------------- End Handle Reset Forgot Password ------------------- */


    /* ------------------- Handle Reset OTP ------------------- */

    static async handleResetOTP({ otp }) {

        const resetedOTP = await forgot_passwords.update({
            otp: null
        }, {
            where: {
                otp
            }
        });

        return resetedOTP;
    };

    /* ------------------- End Handle Reset OTP ------------------- */

};

module.exports = usersRepository;