<template>
  <div class="mv-detail">
    <div class="left-container">
      <div class="video-container">
        <video :src="url" controls autoplay></video>
      </div>
      <div class="icon clearfix">
        <i class="iconfont iconmv"></i>
        <span class="play-count">{{mvDetail.playCount | handlePlayCount}}播放</span>
      </div>
      <div class="tags">
        <a class="tag" href="javascript:;" v-for="item in mvDetail.videoGroup" :key="item.id">#{{item.name}}</a>
      </div>
      <div class="publish">
        发布: {{mvDetail.publishTime}}
      </div>
      <div class="button">
        <!--喜欢-->
        <div class="icon-wrapper">
          <i class="iconfont iconlike" :class="mvDetailInfo.liked ? 'icon-active' : ''"></i>
          {{mvDetailInfo.likedCount}}
        </div>
        <!--收藏-->
        <div class="icon-wrapper">
          <i class="iconfont iconshoucangxuanzhong"></i>
          {{mvDetail.subCount}}
        </div>
        <!--转发-->
        <div class="icon-wrapper">
          <i class="iconfont iconforward"></i>
          {{mvDetailInfo.shareCount}}
        </div>
      </div>
      <div class="comments">
        <i class="iconfont iconxinxi"></i>
        Comments | {{mvDetailInfo.commentCount}}条评论
      </div>
      <!--mv 评论列表-->
      <comment-list :comments="comments"></comment-list>
    </div>
    <div class="right-container">
      <div class="des">
        <h2>视频简介</h2>
        <p v-if="mvDetail.desc">{{mvDetail.desc}}</p>
        <p v-if="!mvDetail.desc">该mv暂无简介</p>
      </div>
      <div class="recommend-video">
        <h2>相关推荐</h2>
        <ul>
          <li v-for="item in recommendMv" :key="item.id">
            <div class="cover">
              <img :src="item.cover" alt="">
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
  </div>
</template>

<script>
  import CommentList from "../components/common/CommentList";
  export default {
    name: "MvDetail",
    components: {
      CommentList
    },
    data() {
      return {
        // 播放地址
        url: "",
        // mv 详情信息
        mvDetail: {},
        // mv 点赞转发评论数数据
        mvDetailInfo: {},
        // 评论信息
        comments: [],
        // 推荐 mv
        recommendMv: []
      }
    },
    methods: {
      // 点击播放 推荐 mv
      play(id) {
        this.$router.push(`/mv-detail/${id}`)
        // 获取 mv 播放地址
        this._getMvURL()
        // 获取 mv 详情信息
        this._getMvDetail()
        // 获取 mv 点赞转发评论数数据
        this._getMvDetailInfo()
        // 获取 mv 评论数据
        this._getMvComments()
        // 获取相关推荐 mv (相似 mv)
        this._getRecommendMv()
      },
      // 获取 mv 播放地址
      async _getMvURL() {
        try {
          let params = {
            id: this.$route.params.id,
            r: 1080
          }
          let res = await this.$api.getMvURL(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.url = res.data.data.url
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取 mv 详情信息
      async _getMvDetail() {
        try {
          let res = await this.$api.getMvDetail(this.$route.params.id)
          if (res.status === 200 && res.statusText === "OK") {
            this.mvDetail = res.data.data
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取 mv 点赞转发评论数数据
      async _getMvDetailInfo() {
        try {
          let res = await this.$api.getMvDetailInfo(this.$route.params.id)
          if (res.status === 200 && res.statusText === "OK") {
            this.mvDetailInfo = res.data
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取 mv 评论数据
      async _getMvComments() {
        try {
          let params = {
            id: this.$route.params.id,
            limit: 20,
            offset: 0
          }
          let res = await this.$api.getMvComments(params)
          if (res.status === 200 && res.statusText === "OK") {
            // 最新评论
            if (res.data.comments.length !== 0) {
              this.comments = res.data.comments
            } else if (res.data.hotComments.length !== 0) {
              this.comments = res.data.hotComments
            } else {
              this.comments = []
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取相关推荐 mv (相似 mv)
      async _getRecommendMv() {
        try {
          let res = await this.$api.getRecommendMv(this.$route.params.id)
          if (res.status === 200 && res.statusText === "OK") {
            res.data.mvs.forEach(item => {
              item.artists = item.artists.map(it => {
                return it.name
              }).join("/")
            })
            this.recommendMv = res.data.mvs
            console.log(res.data)
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取 mv 播放地址
      this._getMvURL()
      // 获取 mv 详情信息
      this._getMvDetail()
      // 获取 mv 点赞转发评论数数据
      this._getMvDetailInfo()
      // 获取 mv 评论数据
      this._getMvComments()
      // 获取相关推荐 mv (相似 mv)
      this._getRecommendMv()
    }
  }
</script>

<style scoped lang="less">
.mv-detail{
  padding-top: 85px;
  padding-bottom: 40px;
  display: flex;
  align-items: flex-start;
  .left-container{
    flex: 1;
    box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
    padding: 15px;
    border-radius: 10px;
    min-width: 600px;
    margin-right: 20px;
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
      }
    }
    .comments{
      margin-top: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #c2c2c2;
    }

  }
  .right-container{
    flex: 0 0 auto;
    width: 350px;
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
  }
}
.icon-active{
  color: #FA2800;
}
.clearfix::before{
  content: "";
  display: block;
  clear: both;
}
</style>
