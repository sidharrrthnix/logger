const { logger } = require("./logger/prod-logger");
const express = require("express");
const fileIn = __filename.slice(__dirname.length + 1);

const app = express();
const { exec } = require("child_process");

const getBranch = () =>
  new Promise((resolve, reject) => {
    return exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
      if (err) reject(`getBranch Error: ${err}`);
      else if (typeof stdout === "string") resolve(stdout.trim());
    });
  });
const someAsyncFunction = async () => {
  console.log(await getBranch());
};

someAsyncFunction();

app.get("/", function (req, res) {
  try {
    // logger.info(["#AD", fileIn, req.path, "request recieved"]);
    logger.info("server");
    res.send("ls");
  } catch (e) {
    console.log(e);
  }
});

// logger.warn("text warn");
app.listen(3000);
