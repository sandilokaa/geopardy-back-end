const { RiskLevels }  = require("../models");

class RiskLevelRepository {

    /* ------------------- Handle Create Risk Level ------------------- */

    static async handleCreateRiskLevel({ adminId, riskLevel, description }) {
    
        const handleCreateRiskLevel = await RiskLevels.create({ adminId, riskLevel, description });

        return handleCreateRiskLevel;

    };

    /* ------------------- End Handle Create Risk Level ------------------- */
    
};

module.exports = RiskLevelRepository;