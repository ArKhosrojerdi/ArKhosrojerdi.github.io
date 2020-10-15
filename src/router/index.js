import {createWebHistory, createRouter} from "vue-router";
import Header from "../components/Header";
import Main from "../components/Main.vue";
import Table from "../components/Table.vue";
import Categories from "../components/Categories/Categories.vue";
import Word from "../components/Word.vue";
import Info from "../components/Info.vue";
import Result from "../components/Result.vue";

const routes = [
    {
        path: "/",
        component: Header,
        children: [
            {
                path: "",
                name: "Main",
                component: Main
            },
            {
                path: "table",
                name: "Table",
                component: Table,
            },
            {
                path: "categories",
                name: "Categories",
                component: Categories,
            },

        ]

    },
    {
        path: "/word",
        name: "Word",
        component: Word,
    },
    {
        path: "/result",
        component: Result,
    },
    {
        path: "/info",
        component: Info,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;