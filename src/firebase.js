// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { downloadAnswers } from "./firebaseDB";
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
const storage = getStorage(app)

let answers = []

//get image for that round
export async function getImage(sponsor){
  const imgLocation = "sponsor-logos/" + sponsor
  const sponsorRef= ref(storage, imgLocation)
  const returnURL = await getDownloadURL(sponsorRef)
  return returnURL
}

//get the answers for desired season
export async function getAnswers(){

  const season = "/f1/2023"
  answers = await downloadAnswers(season)//download answers from Firebase
}

//setup round
export function getRound(){
  const round = {
    "team": "",
    "sponsor": "",
    "image": ""
  }
  const randomTeam = Math.floor(Math.random() * answers.length)
  round.team = answers[randomTeam]["name"]
  const randomSponsor = Math.floor(Math.random() * answers[randomTeam]["sponsors"].length)
  round.sponsor = answers[randomTeam]["sponsors"][randomSponsor]["name"]
  round.image = answers[randomTeam]["sponsors"][randomSponsor]["image"]
  return round
}

