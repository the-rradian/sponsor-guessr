import { initializeApp } from "firebase/app";
import { getDatabase, get , child ,ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBOLFN_Pxh046yoC4YbwyuA7IbkgVKdk",
  authDomain: "sponsor-guesser.firebaseapp.com",
  databaseURL: "https://sponsor-guesser-default-rtdb.firebaseio.com",
  projectId: "sponsor-guesser",
  storageBucket: "sponsor-guesser.appspot.com",
  messagingSenderId: "846361547831",
  appId: "1:846361547831:web:fa571f44730be7dd7c1bb2",
  measurementId: "G-SB7XCSWSSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export async function downloadAnswers(season) {
    let answers = []
    await get(child(ref(database), season))
    .then((snapshot) => {
      if (snapshot.exists()) {
        answers = snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return answers
}