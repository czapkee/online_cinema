import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/components/MainPage.vue";
import Play_page from "@/components/Play_page.vue";
import FilmCat_page from "@/components/FilmCat_page.vue";
import ArtCat_page from "@/components/ArtCat_page.vue";
import About_page from "@/components/About_page.vue";
import NotFound from "@/components/NotFound.vue";
// import TestBack from "@/components/TestBack.vue"; //бэку

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
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