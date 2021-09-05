const express = require("express");
const app = express();

const fs = require("fs");

if ( !process.env.PORT ) {
    throw new Error("Environment variable 'PORT' must be specified.");
}

const port = process.env.PORT;

app.get( "/", (req,res) => {
    res.send("Hello world.");
});

app.get("/video", (req,res) => {
    const path = "./videos/SampleVideo_1280x720_1mb.mp4";

    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occured while accessing the video.");
            res.send(500, err);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Example app Listening on port ${port}!`);
});
