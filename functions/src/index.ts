// import {app} from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import {menuConfig, fetchMenuConfig} from "./pulseConfig";
import * as corsLib from "cors";
const cors = corsLib();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();
const main = express();
app.use(cors);
main.use(cors);
// app.get("/", (req, res) => res.status(200).send("Warm up"));
app.get("/fetchMenuConfig", fetchMenuConfig);
app.post("/menuConfig", menuConfig);
exports.pulse = functions.https.onRequest(app);

main.get("/config", (req, res) => res.status(201).send("Ping Pong!"));
exports.pulseconfig = functions.https.onRequest(main);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
