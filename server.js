const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors')
const app = express();
const reports = require("./routes/api/reports");
const config = require("config")

//body parser middleware
app.use(express.json());
app.use(cors())
//database configuration
const db = config.get("mongoURI");


mongoose.connection.on('error', function (error) {
    console.error('Database connection error:', error);
});

//connection to Mongo using mongoose
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))

//use routes
app.use("/reports", reports);

//server static resources if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log("server started on port: ", port));

