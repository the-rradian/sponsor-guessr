<script setup>
import Guesser from './components/Guesser.vue'
</script>

<template>
  <header>
    <!--<img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
  </header>

  <main class="center">
    <p class="center">Match the sponsor with the correct team</p> 
    <Guesser/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem
}

@media (min-width: 1024px) {
  html {
    display:flex;
    width: fit-content;
    align-items: center;

 }

 .center{
  width:50%;
  margin: auto;
 }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

}
</style>
