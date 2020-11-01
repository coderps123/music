<template>
  <div class="home">
    <div v-if="!isLoading">
      <banner></banner>
      <recommend-song-sheet :songSheetList="songSheetList"></recommend-song-sheet>
      <recommend-song></recommend-song>
      <recommend-singer></recommend-singer>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Banner from "../components/home/Banner"
  import RecommendSongSheet from "../components/home/RecommendSongSheet";
  import RecommendSong from "../components/home/RecommendSongs"
  import RecommendSinger from "../components/home/RecommendSinger";
  import Loading from "../components/common/Loading"

  export default {
    name: "Home",
    components: {
      Banner,
      RecommendSongSheet,
      RecommendSong,
      RecommendSinger,
      Loading
    },
    data() {
      return {
        pageY: 600,
        isShowGoTop: false,
        isLoading: true,
        limit: 24, // 推荐歌单 获取数量
        songSheetList: []
      }
    },
    created() {
      this._getRecommendSongSheet()
    },
    methods: {
      async _getRecommendSongSheet() {
        try {
          let res = await this.$api.getRecommendSongeSheet(this.limit)
          if (res.status === 200 && res.statusText === "OK") {
            this.songSheetList = res.data.result
            this.isLoading = false
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
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
