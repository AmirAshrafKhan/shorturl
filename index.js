const express = require("express");
const urlRoute = require("./routes/url.js");
const { connnectToMongodb } = require("./connect");

const app = express();
const PORT = 8000;

connnectToMongodb(
  "mongodb+srv://amirashrafwrites:amir1991@amirashraf.wkbm6we.mongodb.net/shorturl"
).then(() => console.log("mongoDB connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`server started at PORT, ${PORT}`);
});
