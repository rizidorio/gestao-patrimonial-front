<template>
  <v-app class="back">
    <v-container app class="container">
      <router-view />
    </v-container>
  </v-app>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  button {
    padding: 1.4rem !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
  }

  a {
    color: #000 !important;
  }

  a:hover {
    font-size: 1rem;
    color: #E76F51 !important;
    transition: 300ms;
  }

  .back {
    background-color: #F8F8F1;
  }
</style>

<style scoped>
  .container {
    max-width: unset; 
    padding: 0
  }
</style>
