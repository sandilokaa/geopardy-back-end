const authRepository = require("../repositories/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT } = require("../libs/jwtSecurity");
const cloudinary = require("../cloudinaries/cloudinary");
const { forgotPassword }  = require("../utils/nodemailer");

const SALT_ROUND = 10;

class authService {

    /* ------------------- Handle Register ------------------- */

    static async handleRegister({ name, email, password, phoneNumber, city, picture, role }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password admin minimal 8 karakter!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!phoneNumber) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nomor telepon admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!city) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Kota admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!picture) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Foto profile admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!role) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Role wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            if (getUserByEmail) {

                return {
                    status: false,
                    status_code: 400,
                    message: "Email sudah digunakan!",
                    data: {
                        registeredUser: null,
                    },
                };

            } else {

                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                let pictures = "";

                if (picture) {
                    const fileBase64 = picture.buffer.toString("base64");
                    const file = `data:${picture.mimetype};base64,${fileBase64}`;
                    const cloudinaryPicture = await cloudinary.uploader.upload(file);
                    pictures = cloudinaryPicture.url;
                }

                const createdUser = await authRepository.handleRegister({
                    name,
                    email,
                    password: hashedPassword,
                    phoneNumber,
                    city,
                    picture: pictures,
                    role
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Berhasil mendaftarkan user!",
                    data: {
                        registeredUser: createdUser,
                    },
                };
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registeredUser: null,
                },
            };

        }
    };

    /* ------------------- End Handle Register ------------------- */


    /* ------------------- Handle Login ------------------- */

    static async handleLogin({ email, password }) {


        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email wajib diisi",
                    data: {
                        login_user: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password wajib diisi",
                    data: {
                        login_user: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password minimal 8 karakter",
                    data: {
                        login_user: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            if (!getUserByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email belum terdaftar",
                    data: {
                        logedinUser: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getUserByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getUserByEmail.id,
                        email: getUserByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "User berhasil login!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Email atau password anda salah!",
                        data: {
                            logedinUser: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registeredUser: null,
                },
            };

        }
    };

    /* ------------------- End Handle Login ------------------- */


    /* ------------------- Handle Forgot Password ------------------- */

    static async handleForgotPassword({ email, userId, otp }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email Wajib Diisi",
                    data: {
                        forgotPassword: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            userId = getUserByEmail.id;

            if (!getUserByEmail) {

                return {
                    status: false,
                    statusCode: 404,
                    message: "Email Belum Terdaftar",
                    data: {
                        forgotPassword: null,
                    },
                };

            } else {

                const emailTemplates = {
                    from: 'Geopardy',
                    to: email,
                    subject: 'Konfirmasi Reset Password Akun Geopardy Kamu!',
                    html:
                        `
                                <body>
                                    <section style="padding: 4% 8%;">
                                        <img 
                                            src="https://res.cloudinary.com/dbplhgttm/image/upload/v1669093280/Geopardy-Logo-Paint_jek6bq.png" 
                                            alt="logo-geopardy"
                                            width="140"
                                            heigth="auto"
                                        />
                                        
                                        <div class="content" 
                                            style="
                                            padding:2%; 
                                            margin: 2% 0 0 0;
                                            justify-content: center;
                                            background-color: #FFFFFF;
                                            border: 2px solid #323232;"
                                        >
                                            
                                            <h2 style="color: #000; text-decoration: none;"> Halo ${getUserByEmail.email}, </h2>
                                            
                                            <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                                Untuk mengkonfirmasi permintaan reset password akun Geopardy kamu, masukkan OTP di bawah ini.
                                            </p>
                                            
                                            <p  class="otp" 
                                                style="
                                                text-align: center; 
                                                font-size: 24px;
                                                font-weight: 600;
                                                letter-spacing: 2px;
                                                padding: 2%;
                                                background-color: #0D72CC;
                                                color: #fff;
                                                width: 25%;
                                                display: block;
                                                margin: 0 auto;"
                                            > 
                                                ${otp} 
                                            </p>
                                            <p style="text-align: center; font-size: 16px; color: #000;"> 
                                                Jika kamu tidak meminta reset password, silakan abaikan email ini.
                                            </p>
                                        </div>
                                    </section>    
                                </body>
                        `
                };

                forgotPassword(emailTemplates);


                /* --------------------------- Created & Updated Forgot Password To New Password --------------------------- */

                const getDataForgotPassword = await authRepository.handleCheckForgotPassword({ userId });

                if (getDataForgotPassword) {

                    const updatedForgotPassword = await authRepository.handleUpdateForgotPassword({ userId, otp });

                    return {
                        status: true,
                        status_code: 201,
                        message: "OTP Reset Password Terkirim Ke Email User!",
                        data: {
                            forgotPassword: updatedForgotPassword
                        }
                    };

                } else {

                    const createdForgotPassword = await authRepository.handleForgotPassword({ userId, otp });
                    
                    return {
                        status: true,
                        status_code: 201,
                        message: "OTP Reset Password Terkirim Ke Email User!",
                        data: {
                            forgotPassword: createdForgotPassword
                        }
                    };
                }

                /* --------------------------- End Created & Updated Forgot Password To New Password --------------------------- */
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    forgotPassword: null
                },
            };

        }
    };

    /* ------------------- End Handle Forgot Password ------------------- */


    /* ------------------- Handle Verify Forgot Password ------------------- */

    static async handleVerifyForgotPassword({ otp, isVerified }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP Wajib Diisi",
                    data: {
                        forgotPassword: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const getDataForgotPassword = await authRepository.handleCheckOTPForgotPassword({ otp });

            if (getDataForgotPassword.otp == otp) {

                const updatedVerifryPassword = await authRepository.handleVerifyForgotPassword({ otp, isVerified });

                return {
                    status: true,
                    status_code: 201,
                    message: "OTP berhasil terverifikasi!",
                    data: {
                        forgotPassword: updatedVerifryPassword
                    }
                };

            }
            
        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    forgotPassword: null
                },
            };
            
        }

    };

    /* ------------------- End Handle Verify Forgot Password ------------------- */


    /* ------------------- Handle Reset Forgot Password ------------------- */

    static async handleResetPassword({ email, otp, password }) {

        try {
            
            // ------------------------------- Payload Validation ------------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email wajib diisi",
                    data: {
                        resetPassword: null,
                    }
                }
            }

            if (!otp) {
                return {
                    status: false,
                    status_code: 400,
                    message: "OTP wajib diisi",
                    data: {
                        resetPassword: null,
                    }
                }
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Wajib Diisi",
                    data: {
                        resetPassword: null,
                    }
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password Minimal 8 Karakter",
                    data: {
                        resetPassword: null,
                    }
                };
            }

            // ------------------------------- End Payload Validation ------------------------------- //


            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            const getDataForgotPassword = await authRepository.handleCheckOTPForgotPassword({ otp });

            if (getUserByEmail.email == email && getDataForgotPassword.otp == otp) {

                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const updatedPassword = await authRepository.handleResetPassword({ 
                    email,
                    password: hashedPassword
                });

                const resetedOTP = await authRepository.handleResetOTP({ otp });

                return {
                    status: true,
                    status_code: 201,
                    message: "Password berhasil diubah!",
                    data: {
                        resetPassword: updatedPassword,
                        resetOTP: resetedOTP
                    }
                };

            } else {

                return {
                    status: false,
                    status_code: 400,
                    message: "OTP atau Email anda tidak cocok",
                    data: {
                        resetPassword: null,
                        resetOTP: null
                    }
                };

            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    forgotPassword: null
                },
            };

        }

    };

    /* ------------------- End Handle Reset Forgot Password ------------------- */

};

module.exports = authService;