const riskLevelRepository = require("../repositories/riskLevelRepository");

class RiskLevelService {

    /* ------------------- Handle Create Risk Level ------------------- */

    static async handleCreateRiskLevel({ adminId, riskLevel, description }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!riskLevel) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Risk level is required!",
                    data: {
                        createdRiskLevel: null,
                    },
                };
            }

            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description is required!",
                    data: {
                        createdRiskLevel: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getRiskLevel = await riskLevelRepository.handleGetRiskLevel({ riskLevel });

            if (getRiskLevel?.riskLevel) {

                return {
                    status: false,
                    status_code: 400,
                    message: "Risk level already available!",
                    data: {
                        createdRiskLevel: null,
                    },
                };

            } else {

                const handleCreateRiskLevel = await riskLevelRepository.handleCreateRiskLevel({ adminId, riskLevel, description });

                return {
                    status: true,
                    status_code: 201,
                    message: "New risk level created successfully (:",
                    data: {
                        createdRiskLevel: handleCreateRiskLevel,
                    },
                };
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    createdRiskLevel: null,
                },
            };

        }

    };

    /* ------------------- Handle Create Risk Level ------------------- */

};

module.exports = RiskLevelService;