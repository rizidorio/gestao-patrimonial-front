<template>
  <v-container class="background">
    <router-view />
  </v-container>
</template>

<style scoped>
.background {
  max-width: none;
  background: #efe2be;
  height: 100vh;
}
</style>

<script>
export default {
  name: "NotAuthenticated",
};
</script>
