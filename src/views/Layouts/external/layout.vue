<template>
  <v-container class="back">
    <router-view />
  </v-container>
</template>

<style scoped>
.back {
  max-width: none;
  background: #264653;
  height: 100vh;
}
</style>

<script>
export default {
  name: "NotAuthenticated",
};
</script>
