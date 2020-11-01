<template>
  <div class="recommend-song-sheet"
       v-if="this.songSheetList.length > 0">
    <h2>推荐歌单</h2>
    <song-sheet-list :songSheetList="songSheetList"></song-sheet-list>
  </div>
</template>

<script>
  import SongSheetList from "../common/SongSheetList";
  export default {
    name: "RecommendSongSheet",
    components: {
      SongSheetList,
    },
    props: {
      songSheetList: {
        type: Array,
        default() {
          return []
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
