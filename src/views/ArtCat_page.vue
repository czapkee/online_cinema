<template>
  <catalog-view
      :title="'Актеры'"
      :subtitle="'Актеры и режиссеры'"
      :items="actors"
      :isLoading="isLoading"
      :cardComponent="ActorCard"
      :itemsWord="'актеров'"
      @item-click="handleActorClick"
      @favorite-toggle="handleFavoriteToggle"
  />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CatalogView from '@/components/CatalogView.vue'
import BaseCard from '@/components/BaseCard.vue'

const ActorCard = {
  name: 'ActorCard',
  extends: BaseCard,
  props: {
    role: {
      type: String,
      default: ''
    },
    filmsCount: {
      type: Number,
      default: 0
    },
    nationality: {
      type: String,
      default: ''
    }
  },
  computed: {
    actorSubtitle() {
      const parts = []
      if (this.role) parts.push(this.role)
      if (this.filmsCount > 0) parts.push(`${this.filmsCount} фильмов`)
      if (this.nationality) parts.push(this.nationality)
      return parts.join(' • ')
    }
  },
  methods: {
    getCardProps() {
      return {
        id: this.id,
        title: this.title,
        subtitle: this.actorSubtitle,
        image: this.image,
        year: this.year,
        rating: this.rating,
        genres: this.genres,
        isLoading: this.isLoading,
        showFavorite: this.showFavorite,
        isFavorite: this.isFavorite
      }
    }
  }
}

export default {
  name: 'ArtCatPage',
  components: {
    CatalogView
  },
  setup() {
    const router = useRouter()
    const actors = ref([])
    const isLoading = ref(true)

    const mockActors = [
      {
        id: 1,
        title: 'Леонардо ДиКаприо',
        role: 'Актер',
        year: 1974,
        rating: 9.1,
        genres: ['Драма', 'Комедия', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=DiCaprio',
        filmsCount: 42,
        nationality: 'США',
        description: 'Американский актер, продюсер и защитник окружающей среды.'
      },
      {
        id: 2,
        title: 'Мэрил Стрип',
        role: 'Актриса',
        year: 1949,
        rating: 9.3,
        genres: ['Драма', 'Комедия', 'Мюзикл'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Meryl+Streep',
        filmsCount: 78,
        nationality: 'США'
      },
      {
        id: 3,
        title: 'Кристофер Нолан',
        role: 'Режиссер',
        year: 1970,
        rating: 9.5,
        genres: ['Фантастика', 'Триллер', 'Детектив'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Nolan',
        filmsCount: 12,
        nationality: 'Великобритания'
      },
      {
        id: 4,
        title: 'Квентин Тарантино',
        role: 'Режиссер',
        year: 1963,
        rating: 9.2,
        genres: ['Криминал', 'Драма', 'Комедия'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Tarantino',
        filmsCount: 10,
        nationality: 'США'
      },
      {
        id: 5,
        title: 'Скарлетт Йоханссон',
        role: 'Актриса',
        year: 1984,
        rating: 8.7,
        genres: ['Боевик', 'Драма', 'Фантастика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Scarlett',
        filmsCount: 58,
        nationality: 'США'
      },
      {
        id: 6,
        title: 'Том Хэнкс',
        role: 'Актер',
        year: 1956,
        rating: 9.0,
        genres: ['Драма', 'Комедия', 'Романтика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Tom+Hanks',
        filmsCount: 67,
        nationality: 'США'
      },
      {
        id: 7,
        title: 'Кейт Бланшетт',
        role: 'Актриса',
        year: 1969,
        rating: 8.9,
        genres: ['Драма', 'Фэнтези', 'История'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Cate',
        filmsCount: 46,
        nationality: 'Австралия'
      },
      {
        id: 8,
        title: 'Дэвид Финчер',
        role: 'Режиссер',
        year: 1962,
        rating: 9.1,
        genres: ['Триллер', 'Криминал', 'Драма'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Fincher',
        filmsCount: 11,
        nationality: 'США'
      },
      {
        id: 9,
        title: 'Джонни Депп',
        role: 'Актер',
        year: 1963,
        rating: 8.5,
        genres: ['Комедия', 'Фэнтези', 'Приключения'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Depp',
        filmsCount: 52,
        nationality: 'США'
      },
      {
        id: 10,
        title: 'Эмма Стоун',
        role: 'Актриса',
        year: 1988,
        rating: 8.4,
        genres: ['Комедия', 'Драма', 'Мюзикл'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Emma+Stone',
        filmsCount: 32,
        nationality: 'США'
      },
      {
        id: 11,
        title: 'Дени Вильнёв',
        role: 'Режиссер',
        year: 1967,
        rating: 8.8,
        genres: ['Фантастика', 'Драма', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Villeneuve',
        filmsCount: 9,
        nationality: 'Канада'
      },
      {
        id: 12,
        title: 'Роберт Дауни мл.',
        role: 'Актер',
        year: 1965,
        rating: 8.6,
        genres: ['Боевик', 'Комедия', 'Фантастика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Downey',
        filmsCount: 47,
        nationality: 'США'
      },
      {
        id: 13,
        title: 'Марго Робби',
        role: 'Актриса',
        year: 1990,
        rating: 8.3,
        genres: ['Драма', 'Комедия', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Margot',
        filmsCount: 28,
        nationality: 'Австралия'
      },
      {
        id: 14,
        title: 'Тим Бертон',
        role: 'Режиссер',
        year: 1958,
        rating: 8.7,
        genres: ['Фэнтези', 'Готика', 'Комедия'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Burton',
        filmsCount: 18,
        nationality: 'США'
      },
      {
        id: 15,
        title: 'Натали Портман',
        role: 'Актриса',
        year: 1981,
        rating: 8.8,
        genres: ['Драма', 'Фантастика', 'Триллер'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Natalie',
        filmsCount: 45,
        nationality: 'Израиль'
      },
      {
        id: 16,
        title: 'Стивен Спилберг',
        role: 'Режиссер',
        year: 1946,
        rating: 9.4,
        genres: ['Приключения', 'Драма', 'Фантастика'],
        image: 'https://via.placeholder.com/300x450/2a2a2a/EF959B?text=Spielberg',
        filmsCount: 34,
        nationality: 'США'
      }
    ]

    const loadActors = async () => {
      isLoading.value = true

      try {
        // TODO: Заменить на реальный API запрос
        // const response = await fetch('/api/actors')
        // const data = await response.json()
        // actors.value = data

        await new Promise(resolve => setTimeout(resolve, 500))
        actors.value = mockActors.map(actor => ({
          ...actor,
          subtitle: `${actor.role} • ${actor.filmsCount} фильмов • ${actor.nationality}`,
          showFavorite: false,
          genres: actor.genres || [],
          year: actor.year,
          rating: actor.rating
        }))
      } catch (error) {
        console.error('Ошибка загрузки актеров:', error)
        actors.value = mockActors.map(actor => ({
          ...actor,
          subtitle: `${actor.role} • ${actor.filmsCount} фильмов • ${actor.nationality}`,
          showFavorite: false,
          genres: actor.genres || [],
          year: actor.year,
          rating: actor.rating
        }))
      } finally {
        isLoading.value = false
      }
    }

    const handleActorClick = (actor) => {
      console.log('Selected actor:', actor)
      // router.push(`/actor/${actor.id}`)
    }

    const handleFavoriteToggle = (data) => {
      console.log('Favorite toggle:', data)
    }

    onMounted(() => {
      loadActors()
    })

    return {
      actors,
      isLoading,
      ActorCard,
      handleActorClick,
      handleFavoriteToggle
    }
  }
}
</script>