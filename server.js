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

const adminController = require("./controllers/adminController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/v1/register', fileUpload.single('picture'), authController.handleRegister);
app.post('/v1/login', authController.handleLogin);
// app.post('/v1/forgot-password', authController.handleForgotPassword);

/* -------------- End Auth Endpoint -------------- */


/* -------------- Admin Endpoint -------------- */

app.put('/v1/admin/update/:id', middleware.authenticate, middleware.isAdmin, fileUpload.single('picture'), adminController.handleAdminUpdateProfile );

/* -------------- End Admin Endpoint -------------- */

// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //