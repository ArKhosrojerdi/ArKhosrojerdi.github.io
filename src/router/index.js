import {createWebHistory, createRouter} from "vue-router";
import MainFrame from "../components/MainFrame";
import Configurations from "../components/Configurations/Configurations.vue";
import TableBody from "../components/Table/TableBody.vue";
import Categories from "../components/Categories/Categories.vue";
import Word from "../components/Word/Word.vue";
import Info from "../components/Info/Info.vue";
import Result from "../components/Result/Result.vue";
import Log from "../components/Result/Log.vue";
// import MyChart from "../components/Chart/MyChart.vue";

const routes = [
    {
        path: "/",
        component: MainFrame,
        children: [
            {
                path: "",
                name: "Configurations",
                component: Configurations
            },
            {
                path: "table",
                name: "TableBody",
                component: TableBody,
            },
            {
                path: "categories",
                name: "Categories",
                component: Categories,
            },
            {
                path: "result",
                name: "Result",
                component: Result,
            },
            {
                path: "info",
                name: "Info",
                component: Info,
            },
            {
                path: "/log",
                name: "Log",
                component: Log,
            },
        ]
    },
    {
        path: "/word",
        name: "Word",
        component: Word,
    },
    // {
    //     path: "/c",
    //     name: "MyChart",
    //     component: MyChart,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;