<template>
  <div class="video">
    <div v-if="!isLoading">
      <tag-bar
        :hotTags="categoryList"
        @switchHotTags="switchHotTags"
        :categoryType="tags"
        :mainTag="mainTag" @tagClick="tagClick" @loadingVideo="loadingVideo"></tag-bar>
      <video-list :videoList="videos" v-if="videos.length !== 0"></video-list>
      <div class="button-wrapper">
        <div class="prev button" @click="prevPage" :class="{'active-button': (offset === 0)}">上一页</div>
        <div class="next button" @click="nextPage" :class="{'active-button': !more}">下一页</div>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import TagBar from "../components/common/TagBar";
  import VideoList from "../components/common/VideoList";
  import Loading from "../components/common/Loading"
  export default {
    name: "Video",
    components: {
      TagBar,
      VideoList,
      Loading
    },
    data() {
      return {
        // 视频列表
        videos: [],
        // 视频分类列表
        categoryList: [],
        // 视频标签列表
        tags: [],
        // 主要标签
        mainTag: "全部",
        // 当前加载页码
        offset: 0,
        // 当前视频的 id
        currentId: "",
        // 是否还下一页
        more: true,
        isLoading: true
      }
    },
    methods: {
      // 上一页
      prevPage() {
        this.offset -= 1
        if (this.currentId) {
          this._getVideoList()
        } else {
          this._getAllVideoList()
        }
      },
      // 下一页
      nextPage() {
        this.offset += 1
        if (this.currentId) {
          this._getVideoList()
        } else {
          this._getAllVideoList()
        }
      },
      // 加载全部
      loadingVideo() {
        this.mainTag = "全部"
        // 获取全部视频列表
        this._getAllVideoList()
      },
      // 弹窗区域列表点击事件
      tagClick(group) {
        this.offset = 0
        this.mainTag = group.name
        this.currentId = group.id
        // 获取视频标签/分类下的视频
        this._getVideoList()
      },
      // 点击切换热门标签
      switchHotTags(tag) {
        this.offset = 0
        this.mainTag = tag.name
        this.currentId = tag.id
        // 获取视频标签/分类下的视频
        this._getVideoList()
      },
      // 获取全部视频列表
      async _getAllVideoList() {
        let params = {
          offset: this.offset,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.getAllVideoList(params)
        if (res && res.data.code === 200) {
          let list = res.data.datas
          this.videos = this.handleVideoList(list)
          this.isLoading = false
        }
      },
      // 获取视频分类列表
      async _getVideoCategoryList() {
        let params = {
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.getVideoCategoryList(params)
        if (res && res.data.code === 200) {
          this.categoryList = res.data.data
        }
      },
      // 获取视频标签列表
      async _getVideoTagList() {
        let params = {
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.getVideoTagList(params)
        if (res && res.data.code === 200) {
          this.tags = res.data.data
        }
      },
      // 获取视频标签/分类下的视频
      async _getVideoList() {
        let params = {
          offset: this.offset,
          id: this.currentId,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.getVideoList(params)
        if (res && res.data.code === 200) {
          let list = res.data.datas
          this.videos = this.handleVideoList(list)
        }
      },
      // 处理获取到的视频数据
      handleVideoList(list) {
        let ret = []
        list.map(item => {
          let obj = {}
          if (item.data.creator) {
            obj.artistName = item.data.creator.nickname
            obj.playCount = item.data.playTime
            obj.cover = item.data.coverUrl
            obj.id = item.data.vid
            obj.name = item.data.title
            obj.duration = item.data.durationms
          } else if (item.data.liveData) {
            obj.artistName = item.data.liveData.liveRoom.coverTag
            obj.playCount = item.data.liveData.liveRoom.popularity
            obj.cover = item.data.liveData.liveRoom.coverUrl
            obj.id = item.data.liveData.liveRoom.liveId
            obj.name = item.data.liveData.liveRoom.title
          }
          ret.push(obj)
        })
        return ret
      }
    },
    created() {
      let token = window.localStorage.getItem("token")
      if (token === "null") {
        this.$message.info("请先登录")
        this.$router.replace("/login")
      }
      // 获取全部视频列表
      this._getAllVideoList()
      // 获取视频分类列表
      this._getVideoCategoryList()
      // 获取视频标签列表
      this._getVideoTagList()
    }
  }
</script>

<style scoped lang="less">
.video{
  padding-top: 85px;
  .video-list{
    margin-top: 20px;
  }
  .button-wrapper{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .button{
      padding: 6px 14px;
      background-color: #FA2800;
      margin: 0 10px;
      color: #F7F7F7;
      border-radius: 4px;
      cursor: pointer;
    }
    .active-button{
      background-color: rgba(250, 40, 0, 0.36);
    }
  }
}
</style>
