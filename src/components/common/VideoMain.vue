<template>
  <div class="video-main">
    <div class="video-container">
      <video :src="url" controls autoplay></video>
    </div>
    <div class="icon clearfix">
      <i class="iconfont iconmv"></i>
      <span class="play-count">{{videoDetail.playCount | handlePlayCount}}播放</span>
    </div>
    <div class="tags">
      <a class="tag" href="javascript:;" v-for="item in videoDetail.videoGroup" :key="item.id">#{{item.name}}</a>
    </div>
    <div class="publish">
      发布: {{$utils.formatDate(videoDetail.publishTime, 0)}}
    </div>
    <div class="button">
      <!--喜欢-->
      <div class="icon-wrapper"  @click="likeClick(videoDetailInfo.liked)">
        <i class="iconfont iconlike"
           :class="videoDetailInfo.liked ? 'icon-active' : ''"></i>
        {{videoDetailInfo.likedCount}}
      </div>
      <!--收藏-->
      <div class="icon-wrapper" @click="collectionVideo">
        <i class="iconfont iconshoucangxuanzhong" :class="{'icon-active': collectionButton}"></i>
        {{videoDetail.subCount}}
      </div>
      <!--转发-->
      <div class="icon-wrapper">
        <i class="iconfont iconforward"></i>
        {{videoDetailInfo.shareCount}}
      </div>
    </div>
    <div class="comments">
      <i class="iconfont iconxinxi"></i>
      Comments | {{videoDetailInfo.commentCount}}条评论
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoMain",
    props: {
      videoDetailInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      videoDetail: {
        type: Object,
        default() {
          return {}
        }
      },
      url: {
        type: String,
        default: ""
      },
      collectionButton: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 资源点赞
      likeClick(liked) {
        let token = window.localStorage.getItem("token")
        if (token) {
          this.$emit("likeClick", liked)
        } else {
          this.$router.push("/login")
        }
      },
      // 收藏视频
      collectionVideo() {
        this.$emit("collectionVideo")
      }
    }
  }
</script>

<style scoped lang="less">
.video-main{
  .video-container{
    width: 100%;
    padding-bottom: 56.6%;
    position: relative;
    background-color: #000;
    video{
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .icon{
    margin-top: 6px;
    i{
      color: #FA2800;
      font-size: 20px;
    }
    .play-count{
      float: right;
      font-size: 12px;
    }
  }
  .tags{
    margin-top: 10px;
    .tag{
      padding: 4px 4px;
      margin-right: 5px;
      color: #FA2800;
      font-size: 12px;
    }
  }
  .publish{
    margin-top: 10px;
    color: #4a4a4a;
    font-size: 14px;
  }
  .button{
    display: flex;
    margin-top: 10px;
    .icon-wrapper{
      padding:  6px 20px;
      margin-right: 10px;
      background-color: #f2f2f2;
      border-radius: 20px;
      cursor: pointer;
      i{
        font-size: 16px;
        color: #333;
      }
      .icon-active{
        color: #FA2800;
      }
    }
  }
  .comments{
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #c2c2c2;
  }
}

</style>
