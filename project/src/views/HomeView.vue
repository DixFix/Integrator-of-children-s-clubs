<template>
  <v-container>
    <!-- Лого -->
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-h4">Кружки и секции для детей</h1>
        <p class="text-subtitle-1">Найдите занятие по душе вашему ребенку</p>
      </v-col>
    </v-row>

    <!-- Поиск -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Поиск кружков"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-select
          v-model="categoryFilter"
          :items="categories"
          label="Все направления"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="isLoading">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-2">Загружаем кружки...</p>
      </v-col>
    </v-row>

    <!-- Список кружков -->
    <v-row v-else>
      <v-col
        v-for="club in clubs"
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
              <v-col cols="12" class="mt-2">
                <v-rating
                  v-model="club.rating"
                  half-increments
                  readonly
                  size="small"
                  density="compact"
                ></v-rating>
              </v-col>
            </v-row>
          </v-card-text>
          
          <v-card-actions>
            <v-chip size="small" color="primary" variant="outlined">
              {{ club.categoryName }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {
      categories: [
        { title: 'Спорт', value: 'sport' },
        { title: 'Наука', value: 'science' },
        { title: 'Искусство', value: 'art' },
        { title: 'Языки', value: 'languages' }
      ]
    }
  },
  computed: {
    ...mapState({
      filters: state => state.filters
    }),
    ...mapGetters(['filteredClubs', 'isLoading']),
    
    
    search: {
      get() {
        return this.filters.search
      },
      set(value) {
        this.$store.commit('SET_SEARCH', value || '')
      }
    },
    
    
    categoryFilter: {
      get() {
        return this.filters.category
      },
      set(value) {
        this.$store.commit('SET_CATEGORY_FILTER', value || null)
      }
    },
    
    
    clubs() {
      return this.filteredClubs
    }
  },
  methods: {
    ...mapActions(['loadClubs'])
  },
  created() {
    
    this.loadClubs()
  }
}
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>