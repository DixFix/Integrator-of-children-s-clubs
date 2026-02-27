import { createStore } from 'vuex'


const mockClubs = [
  {
    id: 1,
    name: 'Тест',
    description: 'Тесовое описание',
    address: 'ул. Тестовый',
    ageMin: 7,
    ageMax: 12,
    price: 3500,
    category: 'science',
    categoryName: 'Наука',
    schedule: 'Ср, Пт 16:00-17:30',
    phone: '+7 (123) 456-78-90',
    rating: 4.8,
    image: 'https://placehold.co/600x400/e67e22/white?text=test',
    coordinates: [55.751244, 37.618423]
  },
  {
    id: 2,
    name: 'Тест',
    description: 'Тесовое описание',
    address: 'ул. Тестовый',
    ageMin: 7,
    ageMax: 12,
    price: 3500,
    category: 'sport',
    categoryName: 'Спорт',
    schedule: 'Пн, Ср, Пт 17:00-18:30',
    phone: '+7 (987) 654-32-10',
    rating: 4.5,
    image: 'https://placehold.co/600x400/e67e22/white?text=test',
    coordinates: [55.761244, 37.628423]
  },
  {
    id: 3,
    name: 'Тест',
    description: 'Тесовое описание',
    address: 'ул. Тестовый',
    ageMin: 7,
    ageMax: 12,
    price: 3500,
    category: 'art',
    categoryName: 'Искусство',
    schedule: 'Вт, Чт 18:00-19:30, Сб 12:00-13:30',
    phone: '+7 (555) 123-45-67',
    rating: 4.9,
    image: 'https://placehold.co/600x400/e67e22/white?text=test',
    coordinates: [55.771244, 37.608423]
  },
  {
    id: 4,
    name: 'Тест',
    description: 'Тесовое описание',
    address: 'ул. Тестовый',
    ageMin: 7,
    ageMax: 12,
    price: 3500,
    category: 'languages',
    categoryName: 'Языки',
    schedule: 'Пн, Ср 10:00-11:30, Вт, Чт 17:00-18:30',
    phone: '+7 (444) 555-66-77',
    rating: 4.7,
    image: 'https://placehold.co/600x400/e67e22/white?text=test',
    coordinates: [55.781244, 37.598423]
  }
]

export default createStore({
  state() {
    return {
      clubs: [],          
      loading: false,     
      filters: {
        search: '',
        category: null,
        age: null
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
    }
  },
  actions: {
 
    loadClubs({ commit }) {
      commit('SET_LOADING', true)
      

      setTimeout(() => {
        commit('SET_CLUBS', mockClubs)
        commit('SET_LOADING', false)
      }, 500)
    }
  },
  getters: {

    allClubs: state => state.clubs,
    

    filteredClubs: state => {
      return state.clubs.filter(club => {

        const searchMatch = club.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                           club.description.toLowerCase().includes(state.filters.search.toLowerCase())
        

        const categoryMatch = !state.filters.category || club.category === state.filters.category
        
        return searchMatch && categoryMatch
      })
    },
    

    isLoading: state => state.loading
  }
})