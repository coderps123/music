<template>
  <div class="home">
    <banner></banner>
    <recommend-song-sheet></recommend-song-sheet>
    <recommend-song></recommend-song>
    <recommend-singer></recommend-singer>
  </div>
</template>

<script>
  import Banner from "../components/home/Banner"
  import RecommendSongSheet from "../components/home/RecommendSongSheet";
  import RecommendSong from "../components/home/RecommendSongs"
  import RecommendSinger from "../components/home/RecommendSinger";
  export default {
    name: "Home",
    components: {
      Banner,
      RecommendSongSheet,
      RecommendSong,
      RecommendSinger,
    },
    data() {
      return {
        pageY: 600,
        isShowGoTop: false
      }
    },
  }
</script>

<style scoped lang="less">
.home{
  width: 100%;
  min-width: 1200px;
  padding-bottom: 20px;
  padding-top: 60px;
}
</style>
