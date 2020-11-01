<template>
  <div class="main-router-pages">
    <header-main v-if="!($route.path.indexOf('/login') !== -1)"></header-main>
    <router-view class="router-page"></router-view>
    <footer-main></footer-main>
    <go-top></go-top>
    <play-bar v-if="Object.keys(currentSong).length !== 0"></play-bar>
  </div>
</template>

<script>
  import Login from "./Login"
  import HeaderMain from "./HeaderMain";
  import FooterMain from "./FooterMain";
  import GoTop from "../components/common/GoTop";
  import PlayBar from "../components/playlistdetail/PlayBar";
  import {mapGetters} from "vuex"
  export default {
    name: "MainRouterPages",
    components: {
      Login,
      HeaderMain,
      FooterMain,
      GoTop,
      PlayBar,
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        "currentSong",
      ])
    },
  }
</script>

<style scoped lang="less">
  .main-router-pages{
    position: relative;
    min-height: 100vh;
    min-width: 1200px;
    .router-page{
      padding-left: 5%;
      padding-right: 5%;
      min-height: 473px;
    }
  }

</style>
