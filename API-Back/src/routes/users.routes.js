const multer = require("multer")
const uploadConfig = require("../configs/upload")

// importing "router" from express library
const { Router } = require("express");

// variable that start the library
const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

// importing the controller function
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

// instantiating the controller function
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

// middleware
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// routes
usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update
)

// exporting the module to be accessible to other modules
module.exports = usersRoutes;