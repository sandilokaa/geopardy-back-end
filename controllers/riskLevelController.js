const riskLevelService = require("../services/riskLevelService");

/* ------------------- Handle Create Risk Level ------------------- */

const handleCreateRiskLevel = async (req, res) => {

    const userId = req.user.id;

    const { riskLevel, description } = req.body;

    const { status, status_code, message, data} = await riskLevelService.handleCreateRiskLevel({
        userId,
        riskLevel,
        description
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create Risk Level ------------------- */

module.exports = { handleCreateRiskLevel };