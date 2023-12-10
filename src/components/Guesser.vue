
<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAnswers, getRound, getImage } from '../firebase'
const round = ref({
  "team": "",
  "sponsor": "",
  "image": ""
})
const guess = ref("")
const attempts = ref(3)
let finished = ref(false)
let correct = false
const flag = computed(()=> {
    return correct ? "🏁" : "🚩"
})

onMounted(()=>{
    console.log("Component mounted")
    //download all the answers
    getAnswers()
    .then(() =>{
        newRound()//start a new round
    })
    .catch((error) => {
        console.log(error)
    })
})

function checkAnswer() {
    if (guess.value.trim() === round.value.team){
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
    //get a new round
    round.value = getRound()
    //get the image of the sponsor
    getImage(round.value.image)
        .then((url)=>{
            const logo = document.getElementById('logo')
            logo.setAttribute('src', url)
        })
        .catch((error)=>{
            console.error(error)
            console.log("No related image found")
            const logo = document.getElementById('logo')
            logo.setAttribute('src', "src/assets/no-image-icon-23485.png")
        })
}
</script>
<template>
    <main>
        <h2>Match the sponsor with the correct team</h2> 
        <div class="logo-container">
            <img class="logo-image center" id="logo" src="../assets/no-image-icon-23485.png" alt="Logo">
        </div>
        <h2 class="center">{{ round.sponsor }}</h2>
        <section id="guessing" v-if="!(finished)">
            <h3 id="attempts" class="center">Tries remaining: {{ attempts }}</h3>
            <input id="guess" v-model="guess" type="text" placeholder="Type your guess..."/>
            <p>
                <button class="btn" type="submit" @click="checkAnswer()">Guess</button>
            </p>
        </section>
        <section id="finished" v-if="finished">
                <h3 class="center" id="answer">{{ flag }} Answer: {{ round.team }} {{ flag }}</h3>
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
    .logo-container {
            width:25vw; /* Set a fixed width for the container */
            height: 30vh; /* Set a fixed height for the container */
            overflow: hidden; /* Hide any overflow beyond the container */
            background-color: aliceblue;
        }

        .logo-image {
            width: 100%; /* Make the image fill the container width */
            height: 30vh; /* Make the image fill the container height */
            object-fit: contain; /* Maintain aspect ratio and cover the container */
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
        #logo{
            background-color: white;
            min-height: 100px;
            min-width: 100px;
        }
    }

</style>