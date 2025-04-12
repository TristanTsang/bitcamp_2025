// firebaseAdmin.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

//TODO make relative
const serviceAccount = JSON.parse(
  readFileSync(
    "/Users/tristantsang/bitcamp_2025/backend/src/lib/firebase_service.json",
    "utf8"
  )
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
