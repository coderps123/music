<template>
  <div class="song-sheet-list">
    <div class="container">
      <div class="group" v-for="item in this.songSheetList" :key="item.id" @click="playListDetail(item.id)">
        <a href="javascript:;">
          <span>
            <i class="iconfont iconbofang"></i>
            {{item.playCount | handlePlayCount}}
          </span>
          <img v-lazy="item.picUrl || item.coverImgUrl" alt="">
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SongSheetList",
    props: {
      songSheetList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      playListDetail(id){
        this.$router.push(`/play-list-detail/${id}`)
      }
    }
  }
</script>

<style scoped lang="less">
.song-sheet-list{
  width: 100%;
  .container{
    display: flex;
    flex-wrap: wrap;
    .group{
      flex: 0 0 12.5%;
      width: 12.5%;
      padding:0 20px 20px;
      max-width: 12.5%;
      position: relative;
      a{
        span{
          position: absolute;
          right: 26px;
          top: 6px;
          background-color: #000;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          .iconbofang{
            font-size: 1px;
          }
        }
        img{
          border-radius: 2px;
          margin-bottom: 10px;
          box-shadow: 0 0 5px rgba(1,2,2, .7);
        }
        h3{
          color: #4a4a4a
        }
      }
    }
  }
}
</style>
