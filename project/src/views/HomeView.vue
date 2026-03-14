<template>
  <v-container>
    
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-h4">Кружки и секции для детей</h1>
        <p class="text-subtitle-1">Найдите занятие по душе вашему ребенку</p>
      </v-col>
    </v-row>

    
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
      
      
      <v-col cols="12" md="3">
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

      
      <v-col cols="12" md="3">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-filter"
          @click="showFilters = !showFilters"
        >
          {{ showFilters ? 'Скрыть фильтры' : 'Все фильтры' }}
        </v-btn>
      </v-col>

      
      <v-col cols="12" v-if="showFilters">
        <v-expand-transition>
          <v-card class="pa-4 mt-2">
            <v-row>
              
              <v-col cols="12" md="6">
                <label class="text-subtitle-2">Возраст ребенка</label>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="ageFrom"
                      type="number"
                      label="От"
                      density="compact"
                      variant="outlined"
                      min="0"
                      max="18"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="ageTo"
                      type="number"
                      label="До"
                      density="compact"
                      variant="outlined"
                      min="0"
                      max="18"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

              
              <v-col cols="12" md="6">
                <label class="text-subtitle-2">Время занятий</label>
                <v-chip-group
                  v-model="timeFilter"
                  multiple
                  column
                >
                  <v-chip filter value="morning">Утро</v-chip>
                  <v-chip filter value="afternoon">День</v-chip>
                  <v-chip filter value="evening">Вечер</v-chip>
                </v-chip-group>
              </v-col>

              
              <v-col cols="12" class="text-right">
                <v-btn variant="text" color="grey" @click="resetFilters">
                  Сбросить все фильтры
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
        
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card
          color="primary-lighten-5"
          class="pa-4"
          variant="outlined"
        >
          <v-row align="center">
            <v-col cols="12" md="8">
              <div class="d-flex align-center">
                <v-icon
                  size="48"
                  color="primary"
                  class="mr-4"
                >
                  mdi-map-search
                </v-icon>
                <div>
                  <h3 class="text-h6">Найти кружок на карте</h3>
                  <p class="text-body-2 text-grey mb-0">
                    Посмотрите, какие кружки находятся рядом с вами
                  </p>
                </div>
              </div>
            </v-col>
            
            <v-col cols="12" md="4" class="text-right">
              <v-btn
                color="primary"
                size="large"
                to="/#"
                prepend-icon="mdi-map"
              >
                Открыть карту (скоро)
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row v-if="isLoading">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-2">Загружаем кружки...</p>
      </v-col>
    </v-row>

    
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
          
          <v-btn
            icon
            density="compact"
            :color="isFavorite(club.id) ? 'red' : 'grey'"
            variant="text"
            class="favorite-btn"
            @click.prevent="toggleFavorite(club.id)"
          >
            <v-icon>{{ isFavorite(club.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
          
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
      ],
      showFilters: false
    }
  },
  computed: {
    ...mapState({
      filters: state => state.filters
    }),
    ...mapGetters(['filteredClubs', 'isLoading', 'isFavorite']), 
    
    
    search: {
      get() { return this.filters.search },
      set(value) { this.$store.commit('SET_SEARCH', value || '') }
    },
    
    
    categoryFilter: {
      get() { return this.filters.category },
      set(value) { this.$store.commit('SET_CATEGORY_FILTER', value || null) }
    },
    
   
    ageFrom: {
      get() { return this.filters.ageFrom },
      set(value) { this.$store.commit('SET_AGE_FROM', value ? parseInt(value) : null) }
    },
    
    
    ageTo: {
      get() { return this.filters.ageTo },
      set(value) { this.$store.commit('SET_AGE_TO', value ? parseInt(value) : null) }
    },
    
    
    timeFilter: {
      get() { return this.filters.timeOfDay },
      set(value) { this.$store.commit('SET_TIME_OF_DAY', value) }
    },
    
    
    clubs() {
      return this.filteredClubs
    }
  },
  methods: {
    ...mapActions(['loadClubs', 'toggleFavorite']), 
    
    resetFilters() {
      this.$store.commit('SET_SEARCH', '')
      this.$store.commit('SET_CATEGORY_FILTER', null)
      this.$store.commit('SET_AGE_FROM', null)
      this.$store.commit('SET_AGE_TO', null)
      this.$store.commit('SET_TIME_OF_DAY', [])
      this.showFilters = false
    }
  },
  created() {
    this.loadClubs()
    
    this.$store.commit('LOAD_FAVORITES_FROM_STORAGE')
  }
}
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.favorite-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7) !important;
}
</style>