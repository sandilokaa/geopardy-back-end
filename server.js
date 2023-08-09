const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const fileUpload = require("./utils/fileUpload");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ------------------------- Public File Access ------------------------- //

app.use("/public/files", express.static(path.join(__dirname, "/storages")));

// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");

const userController = require("./controllers/userController");

const adminController = require("./controllers/adminController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/v1/auth/register', fileUpload.single('picture'), authController.handleRegister);
app.post('/v1/auth/login', authController.handleLogin);
app.get('/v1/auth/me', middleware.authenticate, middleware.isAdmin, authController.handleCurrentUser);
app.post('/v1/auth/forgot-password', authController.handleForgotPassword);
app.put('/v1/auth/forgot-password/verify', authController.handleVerifyForgotPassword);
app.put('/v1/auth/reset-password', authController.handleResetPassword);

/* -------------- End Auth Endpoint -------------- */


/* -------------- User Endpoint -------------- */

app.get('/v1/sub-district/results', userController.handleGetSubDistrictData);
app.get('/v1/sub-district/results/:id', userController.handleGetSubDistrictDataById);

/* -------------- End User Endpoint -------------- */


/* -------------- Admin Endpoint -------------- */

app.put('/v1/admin/update/:id', middleware.authenticate, middleware.isAdmin, fileUpload.single('picture'), adminController.handleAdminUpdateProfile );
app.post('/v1/admin/risk-level', middleware.authenticate, middleware.isAdmin, adminController.handleCreateRiskLevel );
app.post('/v1/admin/sub-district', middleware.authenticate, middleware.isAdmin, fileUpload.single('picture'), adminController.handleCreateSubDistrict );
app.put('/v1/admin/sub-district/:id', middleware.authenticate, middleware.isAdmin, fileUpload.single('picture'), adminController.handleUpdateSubDistrict );

/* -------------- End Admin Endpoint -------------- */

// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //