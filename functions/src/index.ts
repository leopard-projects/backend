// import {app} from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
// eslint-disable-next-line object-curly-spacing
import {
  menuConfig,
  fetchMenuConfig,
  fetchVideos,
  addVideos,
  addProfile,
  fetchProfile,
  fetchProfileByID,
  addNewUser,
} from "./pulseConfig";
import * as corsLib from "cors";
const cors = corsLib();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();
const main = express();
const video = express();
const profile = express();
app.use(cors);
main.use(cors);
video.use(cors);
profile.use(cors);
// app.get("/", (req, res) => res.status(200).send("Warm up"));
app.get("/fetchMenuConfig", fetchMenuConfig);
app.post("/menuConfig", menuConfig);
exports.pulse = functions.https.onRequest(app);

video.get("/fetchVideos", fetchVideos);
video.post("/addVideos", addVideos);
exports.pulseVideos = functions.https.onRequest(video);

profile.get("/fetchProfile", fetchProfile);
profile.post("/fetchProfileByID", fetchProfileByID);
profile.post("/addProfile", addProfile);
profile.post("/addNewUser", addNewUser);
exports.user = functions.https.onRequest(profile);

main.get("/config", (req, res) => res.status(201).send("Ping Pong!"));
exports.pulseConfig = functions.https.onRequest(main);
