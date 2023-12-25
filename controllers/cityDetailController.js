const cityDetailService = require("../services/cityDetailService");

/* ------------------- Handle Update City Detail ------------------- */

const handleUpdateCityDetail = async (req, res) => {

    const { id } = req.params;

    const { riskLevelId, latitude, longitude, description } = req.body;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { status, status_code, message, data} = await cityDetailService.handleUpdateCityDetail({
        id,
        riskLevelId,
        latitude,
        longitude,
        description,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update City Detail ------------------- */


/* ------------------- Handle Get City By City Id ------------------- */

const handleGetCityByCityId = async (req, res) => {

    const  { cityId } = req.params;

    const { status, status_code, message, data} = await cityDetailService.handleGetCityByCityId({ cityId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get City By City Id ------------------- */


module.exports = { handleUpdateCityDetail, handleGetCityByCityId };