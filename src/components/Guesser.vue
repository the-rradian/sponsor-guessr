
<script setup>
import { ref, computed, onMounted } from 'vue';
let answers = []
const sponsor = ref("")
const team = ref("")
const guess = ref("")
const attempts = ref(3)
let finished = ref(false)
let correct = false
const flag = computed(()=> {
    return correct ? "🏁" : "🚩"
})

onMounted(()=>{
    console.log("Component mounted")
    getAnswers()
})

async function getAnswers(){

    const res = await fetch("../f12023.json")
    answers = await res.json()
    //console.log(answers)

    const randomTeam = Math.floor(Math.random() * answers.length)
    team.value = answers[randomTeam]["name"]
    const randomSponsor = Math.floor(Math.random() * answers[randomTeam]["sponsors"].length)
    sponsor.value = answers[randomTeam]["sponsors"][randomSponsor]["name"]
}
function checkAnswer() {
    if (guess.value.trim() === team.value){
       correct = true
       console.log("correct")
       finished.value = true
    }
    else {
        attempts.value--
        if(attempts.value === 0){
            finished.value = true
        }
        console.log("incorrect")

    }
}

function newRound() {
    //set finished to false, correct to false, reset attempts to 3, clear guess
    finished.value = false
    correct = false
    attempts.value = 3
    guess.value = ""
    //fetch a new random team and random sponsor from that team
    const randomTeam = Math.floor(Math.random() * answers.length)
    team.value = answers[randomTeam]["name"]
    const randomSponsor = Math.floor(Math.random() * answers[randomTeam]["sponsors"].length)
    sponsor.value = answers[randomTeam]["sponsors"][randomSponsor]["name"]
    //fetch the associated image of that sponsor
}
</script>
<template>
    <main>
        <img class="center" id="logo" src="../assets/logo.svg"/>
        <h2 class="center">{{ sponsor }}</h2>
        <section id="guessing" v-if="!(finished)">
            <h3 id="attempts" class="center">Tries remaining: {{ attempts }}</h3>
            <input id="guess" v-model="guess" type="text" placeholder="Type your guess..."/>
            <p>
                <button class="btn" type="submit" @click="checkAnswer()">Guess</button>
            </p>
        </section>
        <section id="finished" v-if="finished">
                <h3 class="center" id="answer">{{ flag }} Answer: {{ team }} {{ flag }}</h3>
                <button class="btn" @click="newRound()">Try another one</button>
        </section>
    </main>
    
</template>
<style scoped>
    main{
        width: 50%;
        margin: auto;
        min-height: 100em;
        line-height: 20px;
    }
    
    .center{
        width: 50%;
        margin: auto;
        padding-top: 1rem;
        padding-bottom: 1rem;
        align-content: space-around;
    
    }

    .btn{
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 25px;
        margin-top: 1rem;
        margin-bottom: 1rem;

    }

    #guess{
        width:100%;
        height: 40px;
        border: none;
        border-radius: 10px;
        padding: 10px;
        padding-left: 30%;

    }
    #answer{
        display: flex;
        width: 100%;
        margin: auto;
        align-self: center;
    }
    #logo {
        margin-left: 25%;
        margin-right: 25%;
    }


    @media (max-aspect-ratio: 9/16) {
        main{
            width: 100vw;
            margin: auto;
            line-height: 20px;
            
        }
        .btn{
            width: 100vw;
            height: 40px;
            border: none;
            border-radius: 25px;

        }
        .center{
        width: 50%;
        margin: auto;
        padding-top: 1rem;
        padding-bottom: 1rem;
        align-content: center;
        }
        #guess{
        width:100vw;
        height: 40px;
        border: none;
        border-radius: 10px;
        }
    }

</style>