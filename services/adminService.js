const adminRepository = require("../repositories/adminRepository");
const userRepository = require("../repositories/userRepository");
const cloudinary = require("../cloudinaries/cloudinary");

class adminService {

    /* ------------------- Handle Admin Update Profile ------------------- */

    static async handleAdminUpdateProfile({ id, name, email, phoneNumber, city, picture }) {

        try {

            const getAdminById = await adminRepository.handleGetAdminById({ id });

            if (getAdminById.id == id) {

                let pictures = "";

                if (picture) {
                    const fileBase64 = picture.buffer.toString("base64");
                    const file = `data:${picture.mimetype};base64,${fileBase64}`;
                    const cloudinaryPicture = await cloudinary.uploader.upload(file);
                    pictures = cloudinaryPicture.url;
                } else {
                    pictures = getAdminById.picture;
                }

                if (!name) {
                    name = getAdminById.name;
                }

                if (!email) {
                    email = getAdminById.email;
                }

                if (!phoneNumber) {
                    phoneNumber = getAdminById.phoneNumber;
                }

                if (!city) {
                    city = getAdminById.city;
                }


                const updatedAdminProfile = await adminRepository.handleAdminUpdateProfile({
                    id,
                    name,
                    email,
                    phoneNumber,
                    city,
                    picture: pictures
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Admin berhasil merubah profile akun!",
                    data: {
                        updatedAdmin: updatedAdminProfile,
                    },
                };
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedAdmin: null,
                },
            };

        }
    };

    /* ------------------- End Handle Admin Update Profile ------------------- */


    /* ------------------- Handle Create Risk Level ------------------- */

    static async handleCreateRiskLevel({ riskLevel }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!riskLevel) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Risk level wajib diisi",
                    data: {
                        riskLevel: null,
                    }
                }
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            const createdRiskLevel = await adminRepository.handleCreateRiskLevel({ riskLevel });

            return {
                status: true,
                status_code: 201,
                message: "Risk level berhasil dibuat!",
                data: {
                    riskLevel: createdRiskLevel
                }
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    riskLevel: null
                },
            };
        }

    };

    /* ------------------- End Handle Create Risk Level ------------------- */


    /* ------------------- Handle Create Sub District ------------------- */

    static async handleCreateSubDistrict({ userId, districtName, latitude, longitude, riskLevel, description, picture }) {

        try {

            // ------------------------------- Payload Validation ------------------------------- //

            if (!districtName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "District Name wajib diisi",
                    data: {
                        subDistrictData: null,
                    }
                }
            }

            if (!latitude) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Latitude wajib diisi",
                    data: {
                        subDistrictData: null,
                    }
                }
            }

            if (!longitude) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Longitude wajib diisi",
                    data: {
                        subDistrictData: null,
                    }
                }
            }

            if (!riskLevel) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Risk level wajib diisi",
                    data: {
                        subDistrictData: null,
                    }
                }
            }

            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description wajib diisi",
                    data: {
                        subDistrictData: null,
                    }
                }
            }

            // ------------------------------- End Payload Validation ------------------------------- //

            let pictures = "";

            if (picture) {
                const fileBase64 = picture.buffer.toString("base64");
                const file = `data:${picture.mimetype};base64,${fileBase64}`;
                const cloudinaryPicture = await cloudinary.uploader.upload(file);
                pictures = cloudinaryPicture.url;
            }

            const createdSubDistrictData = await adminRepository.handleCreateSubDistrict({
                userId,
                districtName,
                latitude,
                longitude,
                riskLevel,
                description,
                picture: pictures
            });

            return {
                status: true,
                status_code: 201,
                message: "Data berhasil dibuat!",
                data: {
                    subDistrictData: createdSubDistrictData
                }
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    subDistrictData: null
                },
            };
        }

    };

    /* ------------------- End Handle Create Sub District ------------------- */


    /* ------------------- Handle Update Sub District ------------------- */

    static async handleUpdateSubDistrict({ id, districtName, latitude, longitude, riskLevel, description, picture }) {

        try {

            const getSubDistrictDataById = await userRepository.handleGetSubDistrictDataById({ id });

            if (getSubDistrictDataById.id == id) {

                // ------------------------------- Payload Validation ------------------------------- //

                let pictures = "";

                if (picture) {
                    const fileBase64 = picture.buffer.toString("base64");
                    const file = `data:${picture.mimetype};base64,${fileBase64}`;
                    const cloudinaryPicture = await cloudinary.uploader.upload(file);
                    pictures = cloudinaryPicture.url;
                } else {
                    pictures = getSubDistrictDataById.picture;
                }

                if (!districtName){
                    districtName = getSubDistrictDataById.districtName;
                }

                if (!latitude){
                    latitude = getSubDistrictDataById.latitude;
                }

                if (!longitude){
                    longitude = getSubDistrictDataById.longitude;
                }

                if (!riskLevel){
                    riskLevel = getSubDistrictDataById.riskLevel;
                }

                if (!description){
                    description = getSubDistrictDataById.description;
                }

                // ------------------------------- End Payload Validation ------------------------------- //

                const updatedSubDistrictData = await adminRepository.handleUpdateSubDistrict({
                    id, 
                    districtName,
                    latitude,
                    longitude,
                    description,
                    picture: pictures
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Data berhasil diubah!",
                    data: {
                        subDistrictData: updatedSubDistrictData
                    }
                };

            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    subDistrictData: null
                },
            };
        }

    };

    /* ------------------- End Handle Update Sub District ------------------- */

};

module.exports = adminService;