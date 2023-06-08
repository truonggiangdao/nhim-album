/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const {user} = require("firebase-functions/v1/auth");
const functions = require("firebase-functions");

// const store = require("firebase-functions/v2/firestore");
// const logger = require("firebase-functions/logger");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.api = onRequest(app);

exports.trackNewUserCreate = functions.auth.user().onCreate(async (user) => {
  const data = {
    email: user.email,
    date: new Date().toISOString(),
  };

  const newLogRef = db.collection("user_created").doc();

  await newLogRef.set(data);
});

// exports.trackNewUserSignIn = functions.auth
//     .user()
//     .beforeSignIn(async (user, context) => {
//       const data = {
//         email: user.email,
//         ipAddress: context.ipAddress,
//         date: new Date().toISOString(),
//       };

//       const newLogRef = db.collection("user_login").doc();

//       await newLogRef.set(data);
//     });
