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

.item {
background: #e7eaeb !important;
}

.item span {
  font-size: 0.9rem;
  color: #4c4d4a;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 0.9rem !important;
  height: 40px !important;
}

</style>

<style scoped>
  .container {
    max-width: unset; 
    padding: 0
  }
</style>
