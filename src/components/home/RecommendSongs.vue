<template>
  <div class="recommend-songs" v-if="this.songs.length > 0">
    <h2>推荐新歌曲</h2>
    <table class="container">
      <tr class="group" v-for="(item, index) in this.songs" :key="item.id">
        <td class="order-number">
          <play-button :playList="songs" :item="item" :index="index"></play-button>
        </td>
        <td class="image">
          <img v-lazy="item.picUrl" alt="">
        </td>
        <td class="singers">
          <h3>{{item.song}}</h3>
          <span>{{item.singers}}</span>
        </td>
        <td class="album-name">{{item.albumName}}</td>
        <div class="transition">{{item.transitionTime | formatTransitionTime}}</div>
      </tr>
    </table>
  </div>
</template>

<script>
  import PlayButton from "../common/PlayButton";
  export default {
    name: "RecommendSongs",
    components: {
      PlayButton
    },
    data() {
      return {
        songs: []
      }
    },
    filters: {
      handleOrderNumber(index) {
        if (index >= 9) {
          return index + 1
        }
        return "0" + (index + 1)
      },
      formatTransitionTime(time) {
        let sec = (time / 1000)
        let m = parseInt((sec / 60))
        if (m < 10) {
          m = "0" + m
        }
        let s = parseInt((sec % 60))
        if (s < 10) {
          s = "0" + s
        }
        return m + ":" + s
      }
    },
    created() {
      this._getRecommendSongs()
    },
    methods: {
      // 获取歌曲
      async _getRecommendSongs() {
        try {
          let res = await this.$api.getRecommendSongs()
          if (res.status === 200 && res.statusText === "OK") {
            res.data.result.forEach(item => {
              let songObj = {}
              songObj.id = item.id
              songObj.song = item.name
              songObj.picUrl = item.picUrl
              songObj.singers = item.song.album.artists.map(item => item.name).join("/")
              songObj.albumName = "《" + item.song.album.name + "》"
              songObj.transitionTime = item.song.duration
              this.songs.push(songObj)
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
</script>

<style scoped lang="less">
.recommend-songs{

  h2{
    margin-bottom: 20px;
  }
  .container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .group{
      flex: 0 0 48.5%;
      display: flex;
      background-color: #fff;
      box-shadow: 0 0 20px rgb(193, 193, 194, 1);
      border-radius: 6px;
      margin-bottom: 20px;
      .order-number{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image{
        width: 55px;
        height: 100%;
        display: flex;
        align-items: center;
        img{
          width: 100%;
        }
      }
      .singers{
        width: 100px;
        padding: 10px 0 10px 30px;
        display: flex;
        flex-direction: column; // flex项目排列方式
        justify-content: space-around;
        align-items: flex-start;
        h3, span{
          width: 100%;
          overflow: hidden; // 超出部分隐藏
          white-space: nowrap; // 溢出不换行
          text-overflow: ellipsis; // 溢出部份用省略号显示
        }
      }
      .album-name{
        flex: 1;
        padding: 0 30px 0 75px;
        display: flex;
        align-items: center;
        font-weight: bold;
        line-height: 1.5em;
      }
      .transition{
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
