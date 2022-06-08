const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require("mongoose");
const UserRouter = require("./routes/user");

require('dotenv').config()

const app = express();
const jsonParser = bodyParser.json()
const port = process.env.PORT || 3000;

app.use(jsonParser);
app.use(cors())

const URL = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@nodelearn-shard-00-00.kpclt.mongodb.net:27017,nodelearn-shard-00-01.kpclt.mongodb.net:27017,nodelearn-shard-00-02.kpclt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9dguvq-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    () => {
        console.log("mongdb is connected");
    }
);


app.get("/",(req,res) => {
    res.status(200).send("We are on home");
})
app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})