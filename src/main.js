import { createApp } from 'vue'
import App from './App.vue'
import { sponsorRef } from './firebase'
import './assets/main.css'

createApp(App).mount('#app')

const round = {
    "team": "",
    "sponsor": "",
    "image": ""
}
let answers = []

async function getAnswers(){

    const res = await fetch("../f12023.json")
    answers = await res.json()
    //console.log(answers)
    getRound()
}

function getRound(){
    const randomTeam = Math.floor(Math.random() * answers.length)
    round.team = answers[randomTeam]["name"]
    const randomSponsor = Math.floor(Math.random() * answers[randomTeam]["sponsors"].length)
    round.sponsor = answers[randomTeam]["sponsors"][randomSponsor]["name"]
    //answer.image = 
    return round
}
