<template>
  <ul class="video-list">
    <li class="group" v-for="group in videoList">
        <span class="play-count">
          <i class="iconfont iconbofang"></i>
          {{group.playCount | handlePlayCount}}
        </span>
      <div class="cover">
        <img :src="group.cover || group.imgurl16v9" alt="">
        <div class="play-button-cover">
          <i class="iconfont iconbofang2" @click="play(group.id)"></i>
        </div>
        <div class="play-info">
          <span>{{group.artistName}}</span>
          <span>{{group.duration | formatPlayTime}}</span>
        </div>
      </div>
      <h2>{{group.name}}</h2>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "VideoList",
    props: {
      videoList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      play(id) {
        // 进入mv详情页
        this.$router.push({
          path: `/mv-detail/${id}`
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .video-list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;
    .group{
      flex: 0 0 25%;
      padding: 20px;
      position: relative;
      .play-count{
        position: absolute;
        top: 26px;
        right: 30px;
        padding: 0 7px 0 1px;
        border-radius: 0 4px 0 4px;
        background-color: #000;
        color: #fff;
        z-index: 10;
      }
      .cover .play-button-cover:hover{
        opacity: 1;
      }
      .cover{
        position: relative;
        font-size: 0;
        img{
          width: 100%;
        }
        .play-button-cover{
          z-index: 10;
          opacity: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          background-color: rgba(128, 135, 114, 0.51);
          justify-content: center;
          align-items: center;
          i{
            font-size: 14px;
            padding: 10px;
            background-color: #FA2800;
            color: #fff;
            border-radius: 100%;
            cursor: pointer;
          }
        }
        .play-info{
          position: absolute;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          width: 100%;
          bottom: 0;
          height: 30px;
          background-color: rgba(0, 0, 0, .6);
          color: #fff;
          font-size: 13px;
        }
      }
      h2{
        margin-top: 12px;
        font-size: 14px;
        color: #4a4a4a;
      }
    }
  }
</style>
