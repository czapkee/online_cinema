<template>
  <catalog-view
      :title="'Сериалы'"
      :subtitle="'Лучшие сериалы для просмотра'"
      :items="series"
      :isLoading="isLoading"
      :itemsWord="'сериалов'"
      @item-click="handleSeriesClick"
      @favorite-toggle="handleFavoriteToggle"
  />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CatalogView from '@/components/CatalogView.vue'

export default {
  name: 'SerCatPage',
  components: {
    CatalogView
  },
  setup() {
    const router = useRouter()
    const series = ref([])
    const isLoading = ref(true)

    const mockSeries = [
      {
        id: 1,
        title: 'Игра престолов',
        subtitle: 'Драконы и интриги',
        year: 2011,
        rating: 9.3,
        genres: ['Фэнтези', 'Драма', 'Приключения'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Game+of+Thrones',
        description: 'Эпическая сага о борьбе за Железный Трон Семи Королевств.'
      },
      {
        id: 2,
        title: 'Во все тяжкие',
        subtitle: 'Breaking Bad',
        year: 2008,
        rating: 9.5,
        genres: ['Криминал', 'Драма', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Breaking+Bad'
      },
      {
        id: 3,
        title: 'Черное зеркало',
        subtitle: 'Техно-антиутопия',
        year: 2011,
        rating: 8.8,
        genres: ['Фантастика', 'Драма', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Black+Mirror'
      },
      {
        id: 4,
        title: 'Друзья',
        subtitle: 'Культовый ситком',
        year: 1994,
        rating: 8.9,
        genres: ['Комедия', 'Романтика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Friends'
      },
      {
        id: 5,
        title: 'Очень странные дела',
        subtitle: 'Stranger Things',
        year: 2016,
        rating: 8.7,
        genres: ['Фантастика', 'Драма', 'Ужасы'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Stranger+Things'
      },
      {
        id: 6,
        title: 'Корона',
        subtitle: 'The Crown',
        year: 2016,
        rating: 8.7,
        genres: ['Драма', 'История'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=The+Crown'
      },
      {
        id: 7,
        title: 'Шерлок',
        subtitle: 'Sherlock',
        year: 2010,
        rating: 9.1,
        genres: ['Детектив', 'Драма', 'Криминал'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Sherlock'
      },
      {
        id: 8,
        title: 'Настоящий детектив',
        subtitle: 'True Detective',
        year: 2014,
        rating: 8.9,
        genres: ['Криминал', 'Драма', 'Детектив'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=True+Detective'
      },
      {
        id: 9,
        title: 'Офис',
        subtitle: 'The Office',
        year: 2005,
        rating: 8.9,
        genres: ['Комедия'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=The+Office'
      },
      {
        id: 10,
        title: 'Безумцы',
        subtitle: 'Mad Men',
        year: 2007,
        rating: 8.6,
        genres: ['Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Mad+Men'
      },
      {
        id: 11,
        title: 'Мистер Робот',
        subtitle: 'Mr. Robot',
        year: 2015,
        rating: 8.5,
        genres: ['Драма', 'Криминал', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Mr+Robot'
      },
      {
        id: 12,
        title: 'Рассказ служанки',
        subtitle: 'The Handmaid\'s Tale',
        year: 2017,
        rating: 8.4,
        genres: ['Драма', 'Фантастика', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Handmaid+Tale'
      }
    ]

    const loadSeries = async () => {
      isLoading.value = true

      try {
        // TODO: Заменить на реальный API запрос
        // const response = await fetch('/api/series')
        // const data = await response.json()
        // series.value = data

        await new Promise(resolve => setTimeout(resolve, 500))
        series.value = mockSeries
      } catch (error) {
        console.error('Ошибка загрузки сериалов:', error)
        series.value = mockSeries
      } finally {
        isLoading.value = false
      }
    }

    const handleSeriesClick = (series) => {
      console.log('Selected series:', series)
      // router.push(`/series/${series.id}`)
    }

    const handleFavoriteToggle = (data) => {
      console.log('Favorite toggle:', data)
      // API вызов
    }

    onMounted(() => {
      loadSeries()
    })

    return {
      series,
      isLoading,
      handleSeriesClick,
      handleFavoriteToggle
    }
  }
}
</script>