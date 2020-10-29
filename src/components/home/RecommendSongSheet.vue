<template>
  <div class="recommend-song-sheet"
       v-if="this.songSheetList.length > 0">
    <h2>推荐歌单</h2>
    <song-sheet-list :songSheetList="songSheetList" :limit="limit"></song-sheet-list>
  </div>
</template>

<script>
  import SongSheetList from "../common/SongSheetList";
  export default {
    name: "RecommendSongSheet",
    components: {
      SongSheetList,
    },
    data() {
      return {
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
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style scoped lang="less">
.recommend-song-sheet{
  margin: 0 -14px;
  h2{
    padding: 0 0 20px 20px;
  }
}
</style>
