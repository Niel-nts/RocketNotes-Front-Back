// importing "router" from express library
const { Router } = require("express");

// variable that start the library
const tagsRoutes = Router();

// importing the controller function
const TagsController = require("../controllers/TagsController")
// instantiating the controller function
const tagsController = new TagsController()

// middleware
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// routes
tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

// exporting the module to be accessible to other modules
module.exports = tagsRoutes;