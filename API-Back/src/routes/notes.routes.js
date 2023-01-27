// importing "router" from express library
const { Router } = require("express");

// variable that start the library
const notesRoutes = Router();

// importing the controller function
const NotesController = require("../controllers/NotesController")
// instantiating the controller function
const notesController = new NotesController()

// middleware
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// routes
notesRoutes.use(ensureAuthenticated)
notesRoutes.post("/", notesController.create)
notesRoutes.get("/", notesController.index)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

// exporting the module to be accessible to other modules
module.exports = notesRoutes;