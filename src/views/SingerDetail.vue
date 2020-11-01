<template>
  <div class="singer-detail">
    <div v-if="!isLoading">
      <div class="singer-info">
        <div class="mask">
          <div class="avatar">
            <img v-lazy="singerInfo.picUrl" alt="">
          </div>
          <div class="name">
            <h2>
              {{singerInfo.name}}
              <i class="iconfont "></i>
            </h2>
          </div>
          <div class="follow" :class="{'active': singerInfo.followed}" @click="_collectionSinger">
            + 关注他
          </div>
          <div class="des">
            {{singerInfo.briefDesc}}
          </div>
          <div class="all-des">
          <span @click="openDialog">
            全部
            <i class="iconfont iconjiantouyou"></i>
          </span>
            <Dialog v-show="isOpen"
                    :title="singerInfo.name"
                    :text-value="singerInfo.briefDesc"
                    @clearDialog="clearDialog">
            </Dialog>
          </div>
          <div class="info">
            <div class="num">
              <span>{{singerInfo.musicSize}}</span>
              <span>单曲数</span>
            </div>
            <div class="num">
              <span>{{singerInfo.albumSize}}</span>
              <span>专辑数</span>
            </div>
            <div class="num">
              <span>{{singerInfo.mvSize}}</span>
              <span>mv数</span>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-bar">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="item.id"
            :class="currentIndex === index ? 'active-nav-bar' : ''" @click="jumpPage(index, item.path)">
            {{item.label}}
          </li>
        </ul>
      </div>
      <router-view class="router-two-page"></router-view>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Dialog from "../components/common/Dialog";
  import Loading from "../components/common/Loading"
  export default {
    name: "SingerDetail",
    components: {
      Dialog,
      Loading
    },
    data() {
      return {
        // 歌手信息
        singerInfo: {},
        // dialog的显隐
        isOpen: false,
        // 导航模块
        navList: [
          { label: "作品", id: 1, path: "singer-music" },
          { label: "专辑", id: 2, path: "singer-album" },
          { label: "MV", id: 3, path: "singer-mv" },
          { label: "歌手详情", id: 4, path: "singer-desc" },
          { label: "相似歌手", id: 5, path: "similar-singer" }
        ],
        // nav-bar当前索引
        currentIndex: 0,
        isLoading: true
      }
    },
    methods: {
      // 收藏/取消收藏歌手
      async _collectionSinger() {
        let params = {
          id: this.$route.params.id,
          t: this.singerInfo.followed ? 0 : 1,
          timeStamp: new Date().valueOf()
        }
        let res = await this.$api.collectionSinger(params)
        if (res.data.code === 200) {
          this._getSingerSingle(this.$route.params.id)
          console.log(this.singerInfo)
        }
        console.log(res)
      },
      // 切换路由页面
      jumpPage(index, path) {
        this.currentIndex = index
        if (this.$route.path.indexOf(path) === -1) {
          this.$router.push(`/singer-detail/${this.$route.params.id}/${path}`)
        }
      },
      // 打开弹窗
      openDialog() {
        this.isOpen = true
      },
      // 关闭弹窗
      clearDialog() {
        this.isOpen = false
      },
      async _getSingerSingle(id) {
        try {
          let params = {
            id: id,
            timeStamp: new Date().valueOf()
          }
          let res = await this.$api.getSingerSingle(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.singerInfo = res.data.artist
            this.isLoading = false
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取歌手单曲及部分歌手信息
      this._getSingerSingle(this.$route.params.id)
    }
  }
</script>

<style scoped lang="less">
.singer-detail{
  padding: 65px 0 !important;
  .singer-info{
    height: 360px;
    background-image: url("../assets/images/top-bg.jpg");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    .mask{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-image: url("../assets/images/arrow-lr.png");
      background-repeat: no-repeat;
      background-position: bottom;
      background-color: rgba(0, 0, 0, .6);
      color: #fff;
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin-bottom: 14px;
        img{
          border: #f5f5f5 solid 4px;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }

      }
      .name{
        margin-bottom: 10px;
        h2{
          font-size: 20px;
          font-weight: 300;
        }
      }
      .follow{
        margin-bottom: 15px;
        font-size: 12px;
        padding: 4px 8px;
        background: rgba(0, 0, 0, .6);
        border-radius: 100px;
        border: 1px solid #ffffff;
      }
      .active{
        background-color: #FA2800;
        color: #F7F7F7;
      }
      .des{
        width: 700px;
        font-size: 12px;
        line-height: 1.4em;
        max-height: 50px;
        text-align: center;
        text-indent: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp:2; //显示的行
      }
      .all-des{
        width: 700px;
        font-size: 12px;
        span{
          float: right;
          padding: 0 4px 4px;
          cursor: pointer;
          i{
            font-size: 12px;
          }
        }
      }
      .info{
        display: flex;
        .num{
          margin: 10px 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          span:last-child{
            font-size: 12px;
          }
        }
      }
    }
  }
  .nav-bar{
    margin: 20px 0;
    ul{
      display: flex;
      justify-content: center;
      li{
        margin: 0 20px;
        padding: 6px;
        cursor: pointer;
      }
      .active-nav-bar{
        color: #FA2800;
      }
    }
  }
  .router-two-page{
    padding: 0 120px;
  }
}
</style>
