<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Интегратор детских кружков</v-app-bar-title>
      
      <v-btn to="/" text>Главная</v-btn>
      <v-btn to="/favorites" text>Избранное</v-btn>
      <v-btn to="/profile" text>Профиль</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>