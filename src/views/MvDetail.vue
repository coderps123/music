<template>
  <div class="mv-detail">
    <div class="left-container">
      <video-main
        :videoDetailInfo="mvDetailInfo"
        :videoDetail="mvDetail"
        :url="url" @likeClick="likeClick">
      </video-main>
      <!--mv 评论列表-->
      <comment-list :comments="comments" :_getMvComments="_getMvComments" @commentLikeClick="commentLikeClick"></comment-list>
    </div>
    <div class="right-container">
      <video-recommend
        :videoDetail="mvDetail"
        :videoRecommend="recommendMv"
        @play="play">
      </video-recommend>
    </div>
  </div>
</template>

<script>
  import CommentList from "../components/common/CommentList";
  import VideoMain from "../components/common/VideoMain";
  import VideoRecommend from "../components/common/VideoRecommend";
  export default {
    name: "MvDetail",
    components: {
      CommentList,
      VideoMain,
      VideoRecommend
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
      // 评论点赞
      commentLikeClick(id, liked) {
        let t = liked ? 0 : 1
        this._commentLike(id, t)
      },
      // 资源点赞
      likeClick(liked) {
        console.log(liked)
        let t = liked ? 0 : 1
        console.log(t)
        this._resourceLike(t)
      },
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
      // 评论点赞
      async _commentLike(id, t) {
        let params = {
          type: 1,
          id: this.$route.params.id,
          cid: id,
          t: t,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.commentLike(params)
        if (res.data.code === 200) {
          setTimeout(() => {
            this._getMvComments()
          }, 20)
        }
      },
      // 资源点赞
      async _resourceLike(t) {
        let params = {
          id: this.$route.params.id,
          type: 1,
          t: t,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.resourceLike(params)
        if (res.data.code === 200) {
          setTimeout(() => {
            // 获取 mv 点赞转发评论数数据
            this._getMvDetailInfo()
          }, 500)
        }
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
          let params = {
            mvid: this.$route.params.id,
            timeStamp: new Date().valueOf()
          }
          let res = await this.$api.getMvDetailInfo(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.mvDetailInfo = res.data
            console.log(this.mvDetailInfo)
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
            offset: 0,
            timeStamp: new Date().valueOf()
          }
          let res = await this.$api.getMvComments(params)
          if (res.status === 200 && res.statusText === "OK") {
            // 最新评论
            console.log(res)
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


  }
  .right-container{
    flex: 0 0 auto;
    width: 350px;
  }
}

.clearfix::before{
  content: "";
  display: block;
  clear: both;
}
</style>
