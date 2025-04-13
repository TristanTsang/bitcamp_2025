import admin from "firebase-admin";

import dotenv from "dotenv";

dotenv.config();

const decoded = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
  "base64"
).toString("utf8");
const serviceAccount = JSON.parse(decoded);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
