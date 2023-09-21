const admin = require("firebase-admin");
const serviceAccount = JSON.parse(import.meta.env.VITE_APP_FIREBASE_SERVICE_ACCOUNT_KEY)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

const email = "user@example.com";
const password = "1Password";

auth
  .createUser({
    email,
    password,
  })
  .then((userRecord) => {
    console.log("Successfully created user with uid:", userRecord.uid);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });
