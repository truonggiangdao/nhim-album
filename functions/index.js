/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const auth = require("firebase-functions/v1/auth");
// const functions = require("firebase-functions");

// const store = require("firebase-functions/v2/firestore");
// const logger = require("firebase-functions/logger");

const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");
const { getFirestore } = require("firebase-admin/firestore");

const express = require("express");
const cors = require("cors");
const { RequestBodyValidator } = require("./requestValidations");
const { loginSchema } = require("./requestValidations/login.valid");
const { verifyTokenSchema } = require("./requestValidations/token.valid");
// const bodyParser = require("body-parser");

initializeApp();
const db = getFirestore();
const authService = getAuth();
const storage = getStorage();

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.end("Welcome");
});

app.get("/login-logs", async (req, res, next) => {
  const colRef = db.collection("user_login");
  const snapshot = await colRef.get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
});

app.get("/register-logs", async (req, res, next) => {
  const colRef = db.collection("user_created");
  const snapshot = await colRef.get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
});

app.post("/auth", RequestBodyValidator(loginSchema), async (req, res, next) => {
  // const { email, password } = req.body;
  res.end("Authenticated");
});

app.get(
  "/verifyToken",
  RequestBodyValidator(verifyTokenSchema, "query"),
  async (req, res, next) => {
    const token = req.query.token;

    try {
      const result = await authService.verifyIdToken(token, true);

      const data = {
        email: result.email,
        ipAdress: req.ip,
        date: new Date().toISOString(),
      };

      const newLogRef = db.collection("user_login").doc();

      await newLogRef.set(data);

      res.json({ invalid: true, email: result.email });
    } catch (error) {
      res.json({ invalid: false, error: error });
    }
  }
);

app.post("uploadFile", async (req, res, next) => {
  // storage.bucket().upload
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.api = onRequest(app);

exports.trackNewUserCreate = auth.user().onCreate(async (user) => {
  const data = {
    email: user.email,
    date: new Date().toISOString(),
  };

  const newLogRef = db.collection("user_created").doc();

  await newLogRef.set(data);
});
