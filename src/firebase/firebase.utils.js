import firebase from "firebase/app";

import "firebase/firestore";

import "firebase/auth";

const config = {
  apiKey: "AIzaSyB2nxq85c8IZESpBfPQvD-tA4b65JUEXzI",
  authDomain: "crwn-db-dde7d.firebaseapp.com",
  databaseURL: "https://crwn-db-dde7d.firebaseio.com",
  projectId: "crwn-db-dde7d",
  storageBucket: "crwn-db-dde7d.appspot.com",
  messagingSenderId: "398384553526",
  appId: "1:398384553526:web:903ff9c9c1bbfd43e30297",
  measurementId: "G-VGCHJTX91Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
