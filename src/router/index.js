import Vue from "vue";
import VueRouter from "vue-router";
import Cinema from "@/views/cinema.vue";
import Message from "@/views/message.vue";
import Movies from "@/views/movies.vue";
import Personage from "@/views/personage.vue";
import Nowplaying from "@/views/film/nowplaying.vue";
import Comingsoon from "@/views/film/comingsoon.vue";
import Detail from "@/views/Detail.vue";
import City from "@/views/City.vue";
Vue.use(VueRouter); //注册路由模块
const routes = [
  //一级路由
  {
    path: "/cinema",
    // name: "cinema",
    component: Cinema
  },
  {
    path: "/message",
    // name: "About",
    component: Message
    // alias: '/kerwin'//别的名字
  },
  {
    path: "/movies",
    // name: "About",
    component: Movies,
    //二级路由
    children: [
      {
        path: "nowplaying",
        component: Nowplaying
      },
      {
        path: "comingsoon",
        component: Comingsoon
      },
      {
        path: "",
        redirect: "/movies/nowplaying" //孩子的重定向
      }
    ]
    // 一级路由， 路径 存在父子关系， 组件间没有父子关系
    // {
    //   path: '/film/comingsoon',
    //   component:Comingsoon
    // },
  },
  {
    path: "/personage",
    // name: "About",
    component: Personage
  },
  {
    path: "/city",
    // name: "About",
    component: City
  },
  {
    path: "/detail/:id", // 动态路由
    name: "detail", //命令路由
    component: Detail
  },
  {
    path: "/",
    redirect: "/movies" //重定向
  }
];

const router = new VueRouter({
  mode: "hash", // hash , history
  routes
});

export default router;
