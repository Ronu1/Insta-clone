const express = require('express');
const cors = require("cors");
const app = express()
const port =process.env.port || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require('./keys');
const path = require("path")


require('./models/model')
require('./models/post')

app.use(express.json())
app.use(cors())
app.use(require("./routes/auth"))
app.use(require('./routes/createPost'))
app.use(require("./routes/user"));
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);


mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
  console.log("not connected to mongodb");
});

app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function(err){
      res.status(500).send(err)
    }
  )
})

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});