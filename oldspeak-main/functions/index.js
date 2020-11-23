const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// create a new collection in the firebase on new user create
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("Users").doc(user.uid).set({
    userID: user.uid,
    positiveRatings: [],
    negativeRatings: [],
  });
});
