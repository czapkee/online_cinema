<template>
  <catalog-view
      :title="'Фильмы'"
      :subtitle="'Коллекция лучших фильмов'"
      :items="films"
      :isLoading="isLoading"
      :itemsWord="'фильмов'"
      @item-click="handleFilmClick"
      @favorite-toggle="handleFavoriteToggle"
  />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CatalogView from '@/components/CatalogView.vue'

export default {
  name: 'FilmCatPage',
  components: {
    CatalogView
  },
  setup() {
    const router = useRouter()
    const films = ref([])
    const isLoading = ref(true)

    const mockFilms = [
      {
        id: 1,
        title: 'Интерстеллар',
        subtitle: 'Christopher Nolan',
        year: 2014,
        rating: 8.6,
        genres: ['Фантастика', 'Драма', 'Приключения'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Interstellar',
        description: 'Фантастический эпос о путешествии через червоточину в поисках нового дома для человечества.'
      },
      {
        id: 2,
        title: 'Начало',
        subtitle: 'Christopher Nolan',
        year: 2010,
        rating: 8.8,
        genres: ['Фантастика', 'Триллер', 'Детектив'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Inception',
        description: 'Воровство идей через проникновение в подсознание.'
      },
      {
        id: 3,
        title: 'Паразиты',
        subtitle: 'Bong Joon Ho',
        year: 2019,
        rating: 8.6,
        genres: ['Драма', 'Комедия', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Parasite'
      },
      {
        id: 4,
        title: 'Криминальное чтиво',
        subtitle: 'Quentin Tarantino',
        year: 1994,
        rating: 8.9,
        genres: ['Криминал', 'Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Pulp+Fiction'
      },
      {
        id: 5,
        title: 'Форрест Гамп',
        subtitle: 'Robert Zemeckis',
        year: 1994,
        rating: 8.8,
        genres: ['Драма', 'Комедия', 'Романтика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Forrest+Gump'
      },
      {
        id: 6,
        title: 'Зеленая книга',
        subtitle: 'Peter Farrelly',
        year: 2018,
        rating: 8.2,
        genres: ['Драма', 'Комедия', 'Биография'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Green+Book'
      },
      {
        id: 7,
        title: 'Побег из Шоушенка',
        subtitle: 'Frank Darabont',
        year: 1994,
        rating: 9.3,
        genres: ['Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Shawshank'
      },
      {
        id: 8,
        title: 'Король Лев',
        subtitle: 'Roger Allers, Rob Minkoff',
        year: 1994,
        rating: 8.5,
        genres: ['Мультфильм', 'Драма', 'Приключения'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Lion+King'
      },
      {
        id: 9,
        title: 'Темный рыцарь',
        subtitle: 'Christopher Nolan',
        year: 2008,
        rating: 9.0,
        genres: ['Боевик', 'Криминал', 'Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Dark+Knight'
      },
      {
        id: 10,
        title: 'Бойцовский клуб',
        subtitle: 'David Fincher',
        year: 1999,
        rating: 8.8,
        genres: ['Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Fight+Club'
      },
      {
        id: 11,
        title: 'Однажды в Голливуде',
        subtitle: 'Quentin Tarantino',
        year: 2019,
        rating: 7.6,
        genres: ['Драма', 'Комедия'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Once+Upon'
      },
      {
        id: 12,
        title: 'Джокер',
        subtitle: 'Todd Phillips',
        year: 2019,
        rating: 8.4,
        genres: ['Криминал', 'Драма', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Joker'
      }
    ]

    const loadFilms = async () => {
      isLoading.value = true

      try {
        // TODO: Заменить на реальный API запрос
        // const response = await fetch('/api/films')
        // const data = await response.json()
        // films.value = data

        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500))
        films.value = mockFilms
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error)
        films.value = mockFilms // Fallback на мок данные
      } finally {
        isLoading.value = false
      }
    }

    const handleFilmClick = (film) => {
      // TODO: Переход на страницу фильма
      console.log('Selected film:', film)
      // router.push(`/film/${film.id}`)
    }

    const handleFavoriteToggle = (data) => {
      // TODO: Отправка на бэкенд
      console.log('Favorite toggle:', data)
      // fetch(`/api/films/${data.id}/favorite`, {
      //   method: 'POST',
      //   body: JSON.stringify({ isFavorite: data.isFavorite })
      // })
    }

    onMounted(() => {
      loadFilms()
    })

    return {
      films,
      isLoading,
      handleFilmClick,
      handleFavoriteToggle
    }
  }
}
</script>