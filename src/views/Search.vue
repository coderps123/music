<template>
  <div class="search-page">
    <div class="bg">
      <div class="input-wrapper">
        <input type="text">
        <i class="iconfont iconsearch"></i>
      </div>
    </div>
    <div class="nav-bar">
      <h1>搜索结果</h1>
      <ul>
        <li
          v-for="(item, index) in navList"
          :key="item.id"
          :class="{'active-nav-bar': index === currentIndex}" @click="changeTag(index)">
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        searchData: [],
        navList: [
          { label: "单曲", id: 1, path: "/songs" },
          { label: "歌手", id: 2, path: "/sings" },
          { label: "专辑", id: 3, path: "/album" },
          { label: "视频", id: 4, path: "/video" },
          { label: "歌单", id: 5, path: "/play-list" },
          { label: "用户", id: 6, path: "/user" },
          { label: "MV", id: 7, path: "/mv" },
          { label: "歌词", id: 8, path: "/lyric" },
          { label: "电台", id: 9, path: "/radio-station" },
          { label: "综合", id: 10, path: "/comp" }
        ],
        currentIndex: 0
      }
    },
    created() {
      // 获取搜索数据
      this._getSearchData(this.$route.query.keywords)
    },
    methods: {
      // 切换标签
      changeTag(index) {
        this.currentIndex = index
      },
      // 获取搜索数据
      async _getSearchData(value) {
        try {
          let params = {
            keywords: value,
            limit: 60,
            type: 1,
          }
          let res = await this.$api.getSearchData(params)
          if (res.data.code === 200) {
            this.searchData = res.data.result.songs
          }
          console.log(this.searchData)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style scoped lang="less">
.search-page{
  padding: 65px 0 30px;
  .bg{
    width: 100%;
    height: 300px;
    background-image: url("../assets/images/personal.jpg");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-wrapper{
      width: 700px;
      background-color: #fff;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      input{
        width: 640px;
        height: 50px;
        margin-left: 30px;
        font-size: 14px;
      }
      i{
        padding: 15px;
        font-size: 20px;
      }
    }
  }
  .nav-bar{
    display: flex;
    align-items: center;
    padding: 30px 0 0 20px;
    h1{
      font-size: 24px;
    }
    ul{
      margin-left: 50px;
      display: flex;
      li{
        padding: 10px 16px;
        margin-right: 10px;
        border-bottom: 3px solid #fff;
        cursor: pointer;
      }
      .active-nav-bar{
        border-bottom: 3px solid #FA2800;
      }
    }
  }
}
</style>
