const express = require("express");
const urlRoute = require("./routes/url.js");
const { connnectToMongodb } = require("./connect");
const URL = require("./models/url.js");
const path = require("path");
const staticRoute = require("./routes/staticRouter.js");

const app = express();
const PORT = 8000;

connnectToMongodb(
  "mongodb+srv://amirashrafwrites:amir1991@amirashraf.wkbm6we.mongodb.net/shorturl"
).then(() => console.log("mongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/test", async (req, res) => {
  const aLLUrls = await URL.find({});
  return res.render("home", {
    urls: aLLUrls,
  });
});

app.use("/url", urlRoute);
app.use("/", staticRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId,
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//       },
//     }
//   );
//   res.redirect(entry.redirectedURL);
// });
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectedURL);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`server started at PORT, ${PORT}`);
});
