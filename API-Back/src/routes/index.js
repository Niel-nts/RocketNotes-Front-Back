// importing "router" from express library
const { Router } = require("express")

// variable that contains the path of the route module
const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")
const sessionsRoutes = require("./sessions.routes")

// variable that starts the function "router"
const routes = Router()

// directing to the route module
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)
routes.use("/sessions", sessionsRoutes)

// exporting the module to be accessible to other modules
module.exports = routes;