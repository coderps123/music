<template>
  <div class="header-main">
    <div class="box">
      <div class="logo">
        <router-link to="/home" tag="a">
          <img src="../assets/images/logo_black.png" alt="logo">
        </router-link>
      </div>
      <ul>
        <li>
          <router-link to="/home" tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/rank" tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link to="/song_sheet" tag="a">歌单</router-link>
        </li>
        <li>
          <router-link to="/singer" tag="a">歌手</router-link>
        </li>
        <li>
          <router-link to="/video" tag="a">视频</router-link>
        </li>
        <li>
          <router-link to="/mv" tag="a">MV</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont iconsearch" @click="openSearch"></i>
      </div>
      <div class="user">
        <router-link to="/login" tag="a" v-if="!profile">登录</router-link>
        <div v-if="profile" class="profile-login">
          <div class="avatar">
            <img :src="profile.avatarUrl" alt="">
          </div>
          <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{profile.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile-el">
                  <i class="iconfont iconmine"></i>个人主页
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icondengji"></i>我的等级
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont iconshezhi"></i>个人设置
                </el-dropdown-item>
                <el-dropdown-item command="sign-out">
                  <i class="iconfont icontuichu"></i>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="search-wrapper" v-show="isShowSearch" @click="clearSearch">
      <div class="search-container" @click.stop="a">
        <div class="bg">
          <div class="search-form">
            <input type="text" placeholder="请输入搜索关键字, 并按回车键" @keyup.enter="search($event.target.value.trim())">
          </div>
        </div>
        <div class="histroy-search">
          <div class="title">
            <div class="left">
              <i class="iconfont iconzuji"></i>
              <span>历史搜索</span>
            </div>
            <div class="right" @click="delectAll">
              清空
            </div>
          </div>
          <div class="content">
            <ul>
              <li v-for="(item, index) in historySearch" :key="index" @click="historyItemSearch(item)">
                <span>{{item}}</span>
                <i class="iconfont iconclear" @click.stop="deleteTag(index)"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="hot-search">
          <div class="title">
            <div class="left">
              <i class="iconfont iconhot"></i>
              <span>热门搜索</span>
            </div>
          </div>
          <div class="content">
            <ul>
              <li v-for="item in hotSearchList" :key="item.first" @click="hotSearchClick(item.first)">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="icon">
          <i class="iconfont iconguanbi" @click="clearSearch"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex"
  export default {
    name: "HeaderMain",
    computed: {
      ...mapGetters([
        "profile",
        "historySearch",
      ])
    },
    data() {
      return {
        isShowSearch: false,
        hotSearchList: [],
      }
    },
    watch: {
      historySearch(newHis, oldHis) {
        window.localStorage.setItem("historySearch", JSON.stringify(newHis))
      },
    },
    methods: {
      // 删除历史搜索项
      deleteTag(index) {
        this.deleteHistorySearchItem(index)
      },
      // 清空历史记录
      delectAll() {
        this.clearHistorySearch()
      },
      // 历史搜索
      historyItemSearch(value) {
        this.search(value)
      },
      // 热门搜索
      hotSearchClick(value) {
        this.search(value)
      },
      handleCommand(command) {
        if (command === "profile-el") {
          this.$router.push("/profile")
        } else if (command === "sign-out") {
          this.$api.logout().then(res => {
            if (res && res.data.code === 200) {
              window.localStorage.setItem("profile", JSON.stringify(null))
              window.localStorage.setItem("token", JSON.stringify(null))
              window.localStorage.setItem("cookie", JSON.stringify(null))
              this.setProfile(window.localStorage.getItem('profile'))
              this.$message.success("退出登录成功")
              this.$forceUpdate()
              if (this.$route.path.indexOf('/home') === -1) {
                this.$router.replace("/")
              }
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
      // 打开搜索框
      openSearch() {
        this.isShowSearch = true
        this._getSearchHot()
      },
      // 关闭搜索框
      clearSearch() {
        this.isShowSearch = false
      },
      // 获取热门搜索
      async _getSearchHot() {
        try {
          let res = await this.$api.getSearchHot()
          if (res.data.code === 200) {
            this.hotSearchList = res.data.result.hots
          }
        } catch (err) {
          console.log(err)
        }
      },
      a() {},
      // 跳转到 search 页面
      search(value) {
        if (value) {
          this.$router.push(`/search/${value}/songs`)
          this.clearSearch()
          this.setHistorySearch(value)
        }
      },
      ...mapMutations([
        "setHistorySearch",
        "deleteHistorySearchItem",
        "clearHistorySearch",
        "setProfile"
      ])
    },
  }
</script>

<style scoped lang="less">
.header-main{
  width: 100%;
  height: 65px;
  background-color: #fff;
  min-width: 1200px;
  box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
  position: fixed;
  z-index: 100;
  .box{
    margin: 0 5%;
    height: 100%;
    display: flex;
    .logo{
      width: 146px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
    ul{
      flex: 1;
      display: flex;
      padding-left: 20px;
      li{
        padding: 0 15px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .router-link-active{
          color: #FA2800;
        }
      }
    }
    .search, .user{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search{
      margin-right: 14px;
      i{
        padding: 3px 15px;
        font-size: 18px;
        cursor: pointer;
        border-right: 2px solid #e1e1e1;
      }
    }
    .user{
      display: flex;
      .profile-login{
        display: flex;
        align-items: center;
        .avatar{
          width: 40px;
          height: 40px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .user-info{
          margin-left: 12px;
          .el-dropdown-link{
            cursor: pointer;
          }
        }
      }
      a{
        padding: 2px 0 2px 15px;
        cursor: pointer;
      }
    }
  }
  .search-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .82);

    .search-container{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 850px;
      box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
      background-color: #fff;
      border-radius: 8px;

      .bg{
        width: 100%;
        height: 220px;
        background-image: url("../assets/images/personal.jpg");
        background-size: cover;
        border-radius: 8px;
        .search-form{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          input{
            width: 90%;
            height: 50px;
            background-color: rgba(255, 255, 255, .1);
            border-radius: 6px;
            text-align: center;
            color: #F7F7F7;
            &::-webkit-input-placeholder{
              color: #F7F7F7;
            }
          }
        }
      }
      .histroy-search,.hot-search{
        padding: 20px 40px;
        .title{
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          i{
            color: #FA2800;
            margin-right: 8px;
          }
          .right{
            color: #FA2800;
            cursor: pointer;
          }
        }
        .content{
          ul{
            display: flex;
            flex-wrap: wrap;
            li{
              font-size: 10px;
              background-color: #f4f4f5;
              border-radius: 4px;
              padding: 6px 12px;
              margin: 16px 0 0 16px;
              color: #6d7685;
              cursor: pointer;
              i{
                padding: 4px 0;
                margin-left: 6px;
                font-size: 12px;
              }
              &:hover{
                color: #161e27;
              }
            }
          }
        }
      }
      .icon{
        position: relative;
        i{
          position: absolute;
          left: 50%;
          top: 30px;
          transform: translate(-50%);
          background-color: #efefef;
          border-radius: 100%;
          font-size: 18px;
          padding: 4px;
          color: #b9b6b6;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
