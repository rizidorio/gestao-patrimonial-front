<template>
  <v-app class="back">
    <v-container app class="container">
      <router-view />
    </v-container>
  </v-app>
</template>

<style>
  .back {
    background-color: #efe2be;
  }
</style>

<style scoped>
  .container {
    max-width: unset; 
    padding: 0
  }
</style>
