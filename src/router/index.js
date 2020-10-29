import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Login = () => import("../views/Login")
const Register = () => import("../views/Register")
const Home = () => import("../views/Home")
const Rank = () => import("../views/Rank")
const SongSheet = () => import("../views/SongSheet")
const Singer = () => import("../views/Singer")
const Video = () => import("../views/Video")
const MV = () => import("../views/MV")
const PlayListDetail = () => import("../views/PlayListDetail")
const SingerDetail = () => import("../views/SingerDetail")
const SingerMusic = () => import("../views/singer-detail/SingerMusic")
const SingerAlbum = () => import("../views/singer-detail/SingerAlbum")
const SingerMv = () => import("../views/singer-detail/SingerMv")
const SingerDesc = () => import("../views/singer-detail/SingerDesc")
const SimilarSinger = () => import("../views/singer-detail/SimilarSinger")
const MvDetail = () => import("../views/MvDetail")
const Search = () => import("../views/Search")
/*用户登录*/
const Profile = () => import("../views/Profile")

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/rank",
    component: Rank
  },
  {
    path: "/song_sheet",
    component: SongSheet
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/video",
    component: Video
  },
  {
    path: "/mv",
    component: MV
  },
  {
    path: "/play-list-detail/:id",
    component: PlayListDetail
  },
  {
    path: "/singer-detail/:id",
    redirect: "/singer-detail/:id/singer-music"
  },
  {
    path: "/singer-detail/:id",
    component: SingerDetail,
    children: [
      { path: 'singer-music', component: SingerMusic },
      { path: 'singer-album', component: SingerAlbum },
      { path: 'singer-mv', component: SingerMv },
      { path: 'singer-desc', component: SingerDesc },
      { path: 'similar-singer', component: SimilarSinger },
    ]
  },
  {
    path: "/mv-detail/:id",
    component: MvDetail
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/search",
    component: Search
  },
]

const router = new VueRouter({
  routes: routes,
})

export default router
