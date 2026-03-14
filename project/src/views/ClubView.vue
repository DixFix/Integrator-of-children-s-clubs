<template>
  <v-container>
    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Загрузка...</p>
      </v-col>
    </v-row>

    <v-row v-else-if="!club">
      <v-col>
        <v-alert type="error">Кружок не найден</v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      
      <v-col cols="12" md="4">
        <v-img :src="club.image" height="250" cover rounded></v-img>
      </v-col>

      <v-col cols="12" md="8">
        <h1 class="text-h4 mb-2">{{ club.name }}</h1>
        
        <v-chip color="primary" class="mb-4">
          {{ club.categoryName }}
        </v-chip>

        <v-rating v-model="club.rating" readonly half-increments class="mb-4"></v-rating>

        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-map-marker</v-icon>
            </template>
            <v-list-item-title>{{ club.address }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-phone</v-icon>
            </template>
            <v-list-item-title>{{ club.phone }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-currency-rub</v-icon>
            </template>
            <v-list-item-title>{{ club.price }} ₽/месяц</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-human-child</v-icon>
            </template>
            <v-list-item-title>{{ club.ageMin }}-{{ club.ageMax }} лет</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

      
      <v-col cols="12" class="mt-4">
        <v-card>
          <v-card-title>Расписание занятий</v-card-title>
          <v-card-text>
            {{ club.schedule }}
          </v-card-text>
        </v-card>
      </v-col>

      
      <v-col cols="12" class="mt-4">
        <v-card>
          <v-card-title>Отзывы</v-card-title>
          <v-card-text>
            <v-list v-if="reviews.length">
              <v-list-item v-for="(review, i) in reviews" :key="i">
                <template v-slot:prepend>
                  <v-avatar color="primary">{{ review.author[0] }}</v-avatar>
                </template>
                <v-list-item-title>{{ review.author }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-rating v-model="review.rating" readonly size="small"></v-rating>
                  {{ review.text }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <p v-else>Пока нет отзывов</p>
          </v-card-text>
        </v-card>
      </v-col>

      
      <v-col cols="12" class="text-center mt-4">
        <v-btn color="success" size="large" @click="showBookingDialog = true">
          Записаться онлайн
        </v-btn>
      </v-col>
    </v-row>

    
    <v-dialog v-model="showBookingDialog" max-width="500">
      <v-card>
        <v-card-title>Запись на занятие</v-card-title>
        <v-card-text>
          <v-form ref="bookingForm">
            <v-text-field 
              label="Имя ребенка" 
              v-model="booking.childName" 
              required
              :rules="[v => !!v || 'Обязательное поле']"
            ></v-text-field>
            <v-text-field 
              label="Возраст" 
              type="number" 
              v-model="booking.childAge" 
              required
              :rules="[v => !!v || 'Обязательное поле']"
              min="1"
              max="18"
            ></v-text-field>
            <v-text-field 
              label="Телефон родителя" 
              v-model="booking.phone" 
              required
              :rules="[v => !!v || 'Обязательное поле']"
              placeholder="+7 (999) 123-45-67"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="showBookingDialog = false">Отмена</v-btn>
          <v-btn color="success" @click="submitBooking">Записаться</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
    <v-snackbar
      v-model="showSuccessNotification"
      timeout="3000"
      color="success"
    >
      <v-icon class="mr-2">mdi-check-circle</v-icon>
      Заявка отправлена! Скоро с вами свяжутся.
      
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="showSuccessNotification = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClubView',
  data() {
    return {
      club: null,
      loading: true,
      showBookingDialog: false,
      showSuccessNotification: false,  
      booking: {
        childName: '',
        childAge: '',
        phone: ''
      },
      reviews: [
        { author: 'Елена', rating: 5, text: 'Ходим уже полгода, сын бежит на занятия с удовольствием! Виден прогресс в английском.' },
        { author: 'Дмитрий', rating: 4, text: 'Ребёнку нравится атмосфера и дружный коллектив. Минус одна звезда только за неудобное расположение.' },
        { author: 'Ольга', rating: 5, text: 'Лучший кружок, который у нас был! Индивидуальный подход к каждому ребёнку, очень талантливые педагоги.' },
        { author: 'Сергей', rating: 3, text: 'Неплохо, но ожидал большего. Программа какая-то сумбурная, нет четкой системы.' },
        { author: 'Наталья', rating: 5, text: 'Огромное спасибо преподавателю Анне Сергеевне! Сумела заинтересовать моего непоседу, теперь сам просится на занятия.' },
        { author: 'Иван', rating: 2, text: 'К сожалению, разочарован. Постоянная смена расписания и очень шумно в группах.' },
        { author: 'Марина', rating: 4, text: 'В целом всё хорошо, но есть вопросы к организации. Часто не предупреждают об отмене занятий заранее.' },
        { author: 'Алексей', rating: 5, text: 'Дочка просто влюблена в рисование благодаря этому кружку! Материалы отличные, всегда есть чем заняться.' },
        { author: 'Виктория', rating: 3, text: 'Цены высокие, а результат средний. Дороговато для простого присмотра за детьми после школы.' },
        { author: 'Константин', rating: 4, text: 'Хороший кружок, ребёнок ходит с интересом. Есть пара пожеланий по обновлению инвентаря, но в целом твёрдая четвёрка.' }
      ]
    }
  },
  computed: {
    ...mapGetters(['allClubs'])
  },
  methods: {
    loadClub() {
      const id = parseInt(this.$route.params.id)
      this.club = this.allClubs.find(c => c.id === id) || null
      this.loading = false
    },
    submitBooking() {
      
      if (!this.booking.childName || !this.booking.childAge || !this.booking.phone) {
        alert('Пожалуйста, заполните все поля')
        return
      }
      
      
      console.log('Отправка заявки:', this.booking)
      
      
      this.showBookingDialog = false
      
      
      this.showSuccessNotification = true
      
      
      this.booking = { childName: '', childAge: '', phone: '' }
    }
  },
  watch: {
    '$route.params.id': 'loadClub'
  },
  created() {
    this.loadClub()
  }
}
</script>