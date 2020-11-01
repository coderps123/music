<template>
  <div class="video-recommend">
    <div class="des">
      <h2>视频简介</h2>
      <p v-if="videoDetail.desc">{{videoDetail.desc}}</p>
      <p v-if="!videoDetail.desc">暂无简介</p>
    </div>
    <div class="recommend-video">
      <h2>相关推荐</h2>
      <ul>
        <li v-for="item in videoRecommend" :key="item.id">
          <div class="cover">
            <img v-lazy="item.cover" alt="">
            <i class="iconfont iconbofang2" @click="play(item.id)"></i>
          </div>
          <h3>
            <i class="iconfont iconmv"></i>
            <span>
              {{item.name}}
            </span>
          </h3>
          <p>By.{{item.artists}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoRecommend",
    props: {
      videoDetail: {
        type: Object,
        default() {
          return {}
        }
      },
      videoRecommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      play(id) {
        this.$emit("play", id)
      }
    }
  }
</script>

<style scoped lang="less">
  .des,.recommend-video{
    padding: 10px;
    box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
    border-radius: 10px;
    margin-bottom: 20px;
    h2{
      padding-left: 10px;
      border-left: 3px solid #FA2800;
      margin-bottom: 10px;
    }
  }
  .des{
    p{
      font-size: 14px;
      color: #4a4a4a;
      max-height: 300px;
      overflow: auto;
    }
  }
  .recommend-video{
    ul{
      li{
        margin-top: 25px;
        .cover{
          width: 100%;
          height: 185.45px;
          position: relative;
          i{
            color: #fff;
            padding: 12px;
            background-color: red;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
          }
          &:hover{
            i{
              opacity: 1;
            }
          }
        }
        h3{
          display: flex;
          margin: 10px 0 5px;
          i{
            color: #FA2800;
          }
          span{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        p{
          font-size: 13px;
          font-weight: 300;
          color: #4a4a4a;
        }
      }
    }
  }
</style>
