<template>
  <div class="rank">
    <h2>云音乐特色榜</h2>
    <song-sheet-list :songSheetList="this.topList.slice(0, 4)"></song-sheet-list>
    <h2>全球媒体榜</h2>
    <song-sheet-list :songSheetList="this.topList.slice(4, )"></song-sheet-list>
  </div>
</template>

<script>
  import SongSheetList from "../components/common/SongSheetList";
  export default {
    name: "Rank",
    components: {
      SongSheetList
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      async _getRankTopList() {
        try {
          let res = await this.$api.getRankTopList()
          if (res.status === 200 && res.statusText === "OK") {
            res.data.list.forEach(item => {
              let topListObj = {}
              topListObj.picUrl = item.coverImgUrl
              topListObj.name = item.name
              topListObj.playCount = item.playCount
              topListObj.id = item.id
              this.topList.push(topListObj)
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    created() {
      this._getRankTopList()
    }
  }
</script>

<style scoped lang="less">
.rank{
  min-width: 1200px;
  padding-bottom: 10px;
  padding-top: 80px;
  h2{
    padding: 20px 0 20px 18px;
  }
}
</style>
