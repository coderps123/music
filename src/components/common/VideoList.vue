<template>
  <ul class="video-list">
    <li class="group" v-for="group in videoList">
      <div class="cover-container">
        <span class="play-count">
          <i class="iconfont iconbofang"></i>
          {{group.playCount | handlePlayCount}}
        </span>
        <div class="cover">
          <img v-lazy="group.cover || group.imgurl16v9 + '?params=100y100'" alt="">
        </div>
        <div class="icon-wrapper">
          <i class="iconfont iconbofang2 play-button" @click="play(group.id)"></i>
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
        if (this.$route.path.indexOf('/video') !== -1) {
          // 进入video详情页
          this.$router.push(`/video-detail/${id}`)
        } else {
          // 进入mv详情页
          this.$router.push({
            path: `/mv-detail/${id}`
          })
          console.log(id)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .video-list{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .group{
      flex: 0 0 25%;
      max-width: 25%;
      padding: 0 15px 30px;
      .cover-container{
        position: relative;
        height: 150px;
        .cover{
          width: 100%;
          height: 100%;
          font-size: 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .play-count{
          position: absolute;
          top: 6px;
          right: 10px;
          background-color: #000;
          color: #F7F7F7;
          padding: 1px 8px 1px 5px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-right-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .icon-wrapper{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          .play-button{
            position: absolute;
            padding: 10px 10px 10px 12px;
            background-color: #FA2800;
            color: #F7F7F7;
            border-radius: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            cursor: pointer;
          }
        }
        .play-info,.icon-wrapper:hover{
          .play-button{
            opacity: 1;
          }
        }
        .play-info{
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 30px;
          background-color: rgba(0, 0, 0, .6);
          color: #F7F7F7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          z-index: 10;
        }
      }
    }
    h2{
      width: 50%;
      margin-top: 10px;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
