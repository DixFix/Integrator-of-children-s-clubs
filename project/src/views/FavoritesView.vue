<template>
  <v-container>
    <h1 class="text-h4 mb-4">Избранные кружки</h1>

    <v-row v-if="favorites.length === 0">
      <v-col class="text-center">
        <v-icon size="64" color="grey">mdi-heart-outline</v-icon>
        <p class="text-h6 text-grey mt-4">У вас пока нет избранных кружков</p>
        <v-btn color="primary" to="/">Перейти к списку</v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="club in favorites"
        :key="club.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100" :to="`/club/${club.id}`">
          <v-img
            :src="club.image"
            height="150"
            cover
          ></v-img>
          
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ club.name }}
          </v-card-title>
          
          <v-card-subtitle class="pb-2">
            <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
            {{ club.address }}
          </v-card-subtitle>
          
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <v-icon size="small" class="mr-1">mdi-human-child</v-icon>
                {{ club.ageMin }}-{{ club.ageMax }} лет
              </v-col>
              <v-col cols="6">
                <v-icon size="small" class="mr-1">mdi-currency-rub</v-icon>
                {{ club.price }} ₽/мес
              </v-col>
            </v-row>
          </v-card-text>
          
          <v-card-actions>
            <v-btn
              color="red"
              variant="text"
              size="small"
              prepend-icon="mdi-delete"
              @click.prevent="removeFromFavorites(club.id)"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FavoritesView',
  computed: {
    ...mapGetters(['favoriteClubs']),
    favorites() {
      return this.favoriteClubs
    }
  },
  methods: {
    ...mapActions(['toggleFavorite']),
    removeFromFavorites(id) {
      this.toggleFavorite(id)
    }
  }
}
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>