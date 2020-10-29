<template>
  <div class="song-sheet">
    <!--标签栏-->
    <div class="category-container">
      <div class="main-click" @click="showMask">
        <span class='main-tag'>
          {{mainTag}}
        </span>
        <i class="iconfont iconjiantouyou" v-show="!isShowMask"></i>
        <i class="iconfont iconjiantouxia" v-show="isShowMask"></i>
      </div>
      <div class="hot-tags">热门标签:</div>
      <ul>
        <li v-for="(tag, index) in hotTags" :key="tag.id" :class="{'link-active': (index == currentIndex)}">
          <a href="#" :data-index="index" @click="switchHotTags($event.target.dataset.index, tag.name)">{{tag.name}}</a>
        </li>
      </ul>
      <div class="hot">
        <span @click="chooseType('hot')" :class="{'hot-active': songSheetParams.order === 'hot'}" >热门</span>
        <span @click="chooseType('new')" :class="{'hot-active': songSheetParams.order === 'new'}" >最新</span>
      </div>
    </div>
    <!--弹窗区域-->
    <transition name="fade">
      <div class="mask" v-show="isShowMask" @click="showMask">
        <div class="group" v-for="group in categoryType" :key="group.key">
          <h2>
            <a href="javascript:;">
              <i :class="group.icon"></i>
              <span>{{group.value}}</span>
            </a>
          </h2>
          <ul class="clearfix">
            <li v-for="tag in group.tags" @click="transitionClick(tag.name)">
              <a href="#">{{tag.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <song-sheet-list :songSheetList="songSheetList"></song-sheet-list>
    <!--分页区域-->
    <el-pagination
      :page-size="songSheetParams.limit"
      layout="total, prev, pager, next"
      @current-change="currentChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import SongSheetList from "../components/common/SongSheetList"
  export default {
    name: "SongSheet",
    components: {
      SongSheetList
    },
    data() {
      return {
        mainTag: "全部",
        isShowMask: false,
        hotTags: [],
        currentIndex: -1, // 默认那个标签都不选择
        categoryType: [
          {
            key: 0,
            icon: "iconfont iconyuzhong",
            value: "语种",
            tags: null
          },
          {
            key: 1,
            icon: "iconfont iconfengge",
            value: "风格",
            tags: null
          },
          {
            key: 2,
            icon: "iconfont iconchangjing",
            value: "场景",
            tags: null
          },
          {
            key: 3,
            icon: "iconfont iconqinggan",
            value: "情感",
            tags: null
          },
          {
            key: 4,
            icon: "iconfont iconzhuti",
            value: "主题",
            tags: null
          }
        ],
        songSheetParams: {
          order: "hot",
          cat: "全部",
          limit: 40,
          offset: 0
        },
        songSheetList: [],
        total: 0
      }
    },
    methods: {
      // 弹窗点击事件
      transitionClick(tagName) {
        this.mainTag = tagName
        this.songSheetParams.cat = tagName
        // 请求数据
        this._getSongSheet()
      },
      currentChange(currentPage) {
        this.songSheetParams.offset = currentPage - 1
        // 请求数据
        this._getSongSheet()
      },
      // 选择显示类型
      chooseType(type) {
        if (type === this.songSheetParams.order) {
          return
        }
        this.songSheetParams.order = type
        // 请求数据
        this._getSongSheet()
      },
      showMask() {
        this.isShowMask = !this.isShowMask
      },
      // 切换热门标签
      switchHotTags(index, tagName) {
        this.currentIndex = index
        this.songSheetParams.cat = tagName
        // 请求数据
        this._getSongSheet()
      },
      // 获取热门歌单分类
      async _getHotSongSheet() {
        try {
          let res = await this.$api.getHotSongSheet()
          if (res.status === 200 && res.statusText === "OK") {
            this.hotTags = res.data.tags
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取全部歌单分类
      async _getSongSheetCategory() {
        try {
          let res = await this.$api.getSongSheetCategory()
          if (res.status === 200 && res.statusText === "OK") {
            this.category(res.data.sub, 5)
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 将全部歌单列表分类
      category(sub, count) {
        for (let i = 0; i < count; i++) {
          let itemArr = []
          for (let j = 0; j < sub.length; j++) {
            if (sub[j].category === i) {
              itemArr.push(sub[j])
            }
          }
          this.categoryType[i].tags = itemArr
        }
      },
      async _getSongSheet() {
        try {
          let res = await this.$api.getSongSheet(this.songSheetParams)
          if (res.status === 200 && res.statusText === "OK") {
            this.songSheetList = res.data.playlists
            this.total = res.data.total
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      let cat = this.$route.query.tag
      if (cat) {
        this.songSheetParams.cat = cat
        this.mainTag = cat
      }
      // 获取热门歌单分类
      this._getHotSongSheet()
      // 获取全部歌单分类
      this._getSongSheetCategory()
      // 获取歌单, 默认全部
      this._getSongSheet()
    },
  }
</script>

<style scoped lang="less">
.song-sheet{
  min-width: 1200px;
  padding-top: 85px;
  padding-bottom: 30px;
  position: relative;
  .category-container{
    display: flex;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
    margin: 0 20px 20px;
    .main-click{
      padding: 11px 15px;
      background-color: #FA2800;
      border-radius: 5px 0 0 5px;
      color: #fff;
      cursor: pointer;
      i{
        margin-left: 10px;
      }
    }
    .hot-tags{
      padding: 0 15px;
      display: flex;
      align-items: center;
    }
    ul{
      flex: 1;
      li{
        float: left;
        margin-right: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        a:hover{
          color: #FA2800;
        }
      }
    }
    .hot{
      display: flex;
      align-items: center;
      span{
        padding: 6px 10px;
        background-color: #F7F7F7;
        margin-right: 20px;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
        cursor: pointer;
      }
      .hot-active{
        background-color: #FA2800;
        color: #fff;
      }
    }
  }
  .mask{
    width: 720px;
    height: 370px;
    margin: -12px 0 0 15px;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
    border-radius: 4px;
    position: absolute;
    z-index: 10;
    overflow: auto;
    padding-bottom: 40px;
    .group{
      h2{
        padding: 26px 0 8px 20px;
        i{
          margin-right: 6px;
        }
      }
      ul{
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;
        li{
          padding: 8px 15px;
          border-radius: 50px;
          margin: 8px 0 0 10px;
          color: #161e27;
          font-size: 12px;
          background-color: #F7F7F7;
        }
        li:hover{
          background-color: #FA2800;
          a{
            color: #fff;
          }
        }
      }
    }
  }
  .el-pagination{
    margin-top: 20px;
    text-align: center;

  }
  .el-pagination /deep/ button{
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;

  }
  .el-pagination /deep/ ul>li{
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;
  }
  .el-pagination /deep/ .el-pager li.active{
    background-color: #FA2800;
    color: #fff;
  }
  .el-pagination /deep/ .el-pager li:hover{
    color: #FA2800;
  }
}
.link-active a{
  color: #FA2800;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;

}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate(0, 30px);
}
</style>
