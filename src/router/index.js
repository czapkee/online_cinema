import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/views/Main_page.vue";
import Play_page from "@/views/Play_page.vue";
import FilmCat_page from "@/views/FilmCat_page.vue";
import ArtCat_page from "@/views/ArtCat_page.vue";
import About_page from "@/views/About_page.vue";
import NotFoundPage from "@/views/NotFound_page.vue";
import SerCat_page from "@/views/SerCat_page.vue";
// import TestBack from "@/components/TestBack.vue"; //бэку

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
        meta: {
            title: 'Страница не найдена'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: MainPage,
        meta: {
            title: 'Главная страница'
        }
    },
    {
        path: '/play',
        name: 'Player',
        component: Play_page,
        meta: {
            title: 'плеер'
        }
    },
    {
        path: '/films',
        name: 'FilmCatalog',
        component: FilmCat_page,
        props: true,
        meta: {
            title: 'Каталог Фильмов'
        }
    },
    {
        path: '/series',
        name: 'SerCatalog',
        component: SerCat_page,
        props: true,
        meta: {
            title: 'Каталог Сериалов'
        }
    },
    {
        path: '/artists',
        name: 'ArtCatalog',
        component: ArtCat_page,
        props: true,
        meta: {
            title: 'Каталог Актеров'
        }
    },
    {
        path: '/about',
        name: 'AboutUS',
        component: About_page,
        props: true,
        meta: {
            title: 'О нас'
        }
    },
    //тест несту
    // {
    //     path: '/test',
    //     name: 'Test',
    //     component: TestBack,
    //     props: true,
    //     meta: {
    //         title: 'Test Nest API'
    //     }
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router