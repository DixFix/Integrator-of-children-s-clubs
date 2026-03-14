import { createStore } from 'vuex'

const mockClubs = [
  {
    id: 1,
    name: 'Юный химик',
    description: 'Увлекательные опыты и основы химии для детей от 7 лет',
    address: 'ул. Ленина, 15, каб. 305',
    ageMin: 7,
    ageMax: 12,
    price: 3500,
    category: 'science',
    categoryName: 'Наука',
    schedule: 'Ср, Пт 16:00-17:30',
    phone: '+7 (999) 555-22-11',
    rating: 4.8,
    image: 'https://placehold.co/600x400/3498db/white?text=Chemistry',
    coordinates: [55.751244, 37.618423]
  },
  {
    id: 2,
    name: 'Футбольная секция "Старт"',
    description: 'Профессиональные тренировки по футболу для мальчиков и девочек',
    address: 'Стадион "Труд"',
    ageMin: 5,
    ageMax: 14,
    price: 2800,
    category: 'sport',
    categoryName: 'Спорт',
    schedule: 'Пн, Ср, Пт 17:00-18:30',
    phone: '+7 (999) 555-22-11',
    rating: 4.5,
    image: 'https://placehold.co/600x400/27ae60/white?text=Football',
    coordinates: [55.761244, 37.628423]
  },
  {
    id: 3,
    name: 'Школа рисования "Акварелька"',
    description: 'Учим рисовать в разных техниках: акварель, гуашь, пастель',
    address: 'ул. Тверская, 13, каб. 6',
    ageMin: 4,
    ageMax: 10,
    price: 2500,
    category: 'art',
    categoryName: 'Искусство',
    schedule: 'Вт, Чт 18:00-19:30, Сб 12:00-13:30',
    phone: '+7 (999) 555-22-11',
    rating: 4.9,
    image: 'https://placehold.co/600x400/e67e22/white?text=Art',
    coordinates: [55.771244, 37.608423]
  },
  {
    id: 4,
    name: 'Английский для малышей',
    description: 'Изучение английского языка в игровой форме',
    address: 'ул. Тверская, 10, офис 5',
    ageMin: 3,
    ageMax: 7,
    price: 3200,
    category: 'languages',
    categoryName: 'Языки',
    schedule: 'Пн, Ср 10:00-11:30, Вт, Чт 17:00-18:30',
    phone: '+7 (999) 555-22-11',
    rating: 4.7,
    image: 'https://placehold.co/600x400/9b59b6/white?text=English',
    coordinates: [55.781244, 37.598423]
  }
]

export default createStore({
  state() {
    return {
      clubs: [],
      loading: false,
      favorites: [], 
      filters: {
        search: '',
        category: null,
        ageFrom: null,
        ageTo: null,
        timeOfDay: []
      }
    }
  },
  mutations: {
    SET_CLUBS(state, clubs) {
      state.clubs = clubs
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_SEARCH(state, searchText) {
      state.filters.search = searchText
    },
    SET_CATEGORY_FILTER(state, category) {
      state.filters.category = category
    },
    SET_AGE_FROM(state, age) {
      state.filters.ageFrom = age
    },
    SET_AGE_TO(state, age) {
      state.filters.ageTo = age
    },
    SET_TIME_OF_DAY(state, times) {
      state.filters.timeOfDay = times
    },
    
    ADD_TO_FAVORITES(state, clubId) {
      if (!state.favorites.includes(clubId)) {
        state.favorites.push(clubId)
      }
    },
    REMOVE_FROM_FAVORITES(state, clubId) {
      state.favorites = state.favorites.filter(id => id !== clubId)
    },
    LOAD_FAVORITES_FROM_STORAGE(state) {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        state.favorites = JSON.parse(saved)
      }
    }
  },
  actions: {
    loadClubs({ commit }) {
      commit('SET_LOADING', true)

      setTimeout(() => {
        commit('SET_CLUBS', mockClubs)
        commit('SET_LOADING', false)
      }, 500)
    },
    
    saveFavoritesToStorage({ state }) {
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    toggleFavorite({ commit, dispatch, state }, clubId) {
      if (state.favorites.includes(clubId)) {
        commit('REMOVE_FROM_FAVORITES', clubId)
      } else {
        commit('ADD_TO_FAVORITES', clubId)
      }
      dispatch('saveFavoritesToStorage')
    }
  },
  getters: {
    allClubs: state => state.clubs,

    isLoading: state => state.loading,

    
    favoriteClubs: state => {
      return state.clubs.filter(club => state.favorites.includes(club.id))
    },
    isFavorite: state => (clubId) => {
      return state.favorites.includes(clubId)
    },

    filteredClubs: state => {
      return state.clubs.filter(club => {
        
        const searchMatch = club.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          club.description.toLowerCase().includes(state.filters.search.toLowerCase())

        
        const categoryMatch = !state.filters.category || club.category === state.filters.category

        
        let ageMatch = true
        if (state.filters.ageFrom || state.filters.ageTo) {
          const clubMinAge = club.ageMin
          const clubMaxAge = club.ageMax

          if (state.filters.ageFrom && state.filters.ageTo) {
            ageMatch = (state.filters.ageFrom >= clubMinAge && state.filters.ageFrom <= clubMaxAge) ||
              (state.filters.ageTo >= clubMinAge && state.filters.ageTo <= clubMaxAge) ||
              (state.filters.ageFrom <= clubMinAge && state.filters.ageTo >= clubMaxAge)
          } else if (state.filters.ageFrom) {
            ageMatch = state.filters.ageFrom <= clubMaxAge
          } else if (state.filters.ageTo) {
            ageMatch = state.filters.ageTo >= clubMinAge
          }
        }

        
        let timeMatch = true
        if (state.filters.timeOfDay.length > 0) {
          const schedule = club.schedule.toLowerCase()
          timeMatch = state.filters.timeOfDay.some(time => {
            if (time === 'morning') return schedule.includes('утр') || schedule.includes('10:')
            if (time === 'afternoon') return schedule.includes('дн') || schedule.includes('14:') || schedule.includes('15:')
            if (time === 'evening') return schedule.includes('веч') || schedule.includes('18:') || schedule.includes('19:')
            return false
          })
        }

        return searchMatch && categoryMatch && ageMatch && timeMatch
      })
    }
  }
})