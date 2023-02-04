require("express-async-errors")
require("dotenv/config")
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const { request, response } = require("express")
const uploadConfig = require("./configs/upload")
const cors = require("cors")

// variable that load the express library
const express = require("express")

// by default, this require sent to the "./routes" folder will be forwarded to the "index.js" file in the folder.
const routes = require("./routes")

// variable that starts the library
const app = express()
app.use(cors())

// variable that converts data to json format
app.use(express.json())

// When the server is accessed, this is where the route starts to be directed
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

// listening to requests
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))