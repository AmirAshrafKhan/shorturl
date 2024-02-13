const express = require("express");
const urlRoute = require("./routes/url.js");
const { connnectToMongodb } = require("./connect");
const URL = require("./models/url.js");

const app = express();
const PORT = 8000;

connnectToMongodb(
  "mongodb+srv://amirashrafwrites:amir1991@amirashraf.wkbm6we.mongodb.net/shorturl"
).then(() => console.log("mongoDB connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectedURL);
});

app.listen(PORT, () => {
  console.log(`server started at PORT, ${PORT}`);
});
