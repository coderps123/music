<template>
  <div class="play-list-detail" v-if="Object.keys(playList).length !== 0">
    <div class="left-container">
      <!--歌单详情页 左上角 top 展示-->
      <top-title :playList="playList"
                 @openDialog="openDialog">
      </top-title>
      <!--歌单详情页 左下角 list 展示-->
      <play-list
        :playListTable="playListTable"
        :subscribed="playList.subscribed"
        @getPlayListDetail="getPlayListDetail">
      </play-list>
    </div>
    <div class="right-container">
      <sub-scribers :subscribers="subscribers"></sub-scribers>
      <recommend :playListRecommend="playListRecommend"></recommend>
      <comment :hotComments="hotComments" :comments="comments"></comment>
    </div>
    <Dialog v-if="dialog"
            @clearDialog="clearDialog"
            :title="playList.name" :textValue="des">
    </Dialog>
  </div>
</template>

<script>
  import TopTitle from "../components/playlistdetail/TopTitle";
  import PlayList from "../components/playlistdetail/PlayList";
  import SubScribers from "../components/playlistdetail/SubScribers";
  import Recommend from "../components/playlistdetail/Recommend";
  import Comment from "../components/playlistdetail/Comment";
  import Dialog from "../components/common/Dialog";
  export default {
    name: "PlayListDetail",
    data() {
      return {
        // 头部数据
        playList: {},
        dialog: false,
        // 歌单列表
        playListTable: [],
        // 歌单收藏者数组
        subscribers: [],
        // 歌单推荐数组
        playListRecommend: [],
        // 点击全部按钮展示的详细信息
        des: "",
        // 热门评论
        hotComments: [],
        // 评论
        comments: []
      }
    },
    components: {
      TopTitle,
      Dialog,
      PlayList,
      SubScribers,
      Recommend,
      Comment
    },
    methods: {
      // 获取歌单详情数据
      getPlayListDetail() {
        setTimeout(() => {
          this._getPlayListDetail(true)
        }, 300)
      },
      // 关闭弹窗
      clearDialog() {
        this.dialog = false
      },
      // 关闭弹窗
      openDialog() {
        this.dialog = true
      },
      // 获取歌单详情
      async _getPlayListDetail(isRefresh = false) {
        try {
          let params = {
            id: this.$route.params.id,
            s: 100,
            timestamp: new Date().valueOf()
          }
          let res = await this.$api.getPlayListDetail(params)
          if (res.status === 200 && res.statusText === "OK") {
            if (res.data.playlist.description !== null) {
              this.des = res.data.playlist.description.replace(/\n/g, "<br />")
            }
            this.playList = res.data.playlist
            if (!isRefresh) {
              res.data.playlist.tracks.forEach(item => {
                this.handlePlayList(item)
              })
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 为table表格处理数据
      handlePlayList(item) {
        let obj = {}
        obj.id = item.id
        obj.song = item.name
        obj.singer = item.ar.map(singer => singer.name).join("/")
        obj.album = item.al.name
        obj.picUrl = item.al.picUrl
        obj.transitionTime = item.dt
        obj.error = false
        this.playListTable.push(obj)
      },
      // 获取歌单收藏者
      async _getSubScribersPlayList() {
        try {
          let params = {
            id: this.$route.params.id,
            limit: 28,
            offset: 0
          }
          let res = await this.$api.getSubScribersPlayList(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.subscribers = res.data.subscribers
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取歌单推荐
      async _getPlayListRecommend() {
        try {
          let res = await this.$api.getPlayListRecommend(this.$route.params.id)
          if (res.status === 200 && res.statusText === "OK") {
            this.playListRecommend = res.data.playlists
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取歌单评论
      async _getPlayListComment() {
        try {
          let params = {
            id: this.$route.params.id,
            limit: 20
          }
          let res = await this.$api.getPlayListComment(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.hotComments = res.data.hotComments
            this.comments = res.data.comments
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取歌单详情
      this._getPlayListDetail()
      // 获取歌单收藏者
      this._getSubScribersPlayList()
      // 获取歌单推荐
      this._getPlayListRecommend()
      // 获取歌单评论
      this._getPlayListComment()
    }
  }
</script>

<style lang="less">
.play-list-detail{
  min-width: 1230px;
  padding-top: 80px;
  padding-bottom: 30px;
  display: flex;
  align-items: end;
  background-color: #fff;
  .left-container{
    padding: 20px 15px 20px 20px;
    width: 72%;
    box-shadow: 0 5px 40px rgba(1, 10, 18, .1);
    border-radius: 10px;
  }
  .right-container{
    width: 26%;
    min-width: 348px;
    margin-left: 20px;
    .subscribers,.recommend,.comment{
      box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
      border-radius: 10px;
      padding: 4px 6px 8px;
      h2{
        border-left: 3px solid #FA2800;
        padding: 1px 10px;
        margin: 10px 0 10px 5px;
      }
    }
  }
  .play-list-detail>.activeOpen{
    z-index: 1004 !important;
  }
}
</style>
