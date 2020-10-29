<template>
  <div class="profile">
    <div class="bg-image"></div>
    <div class="profile-container">
      <div class="left">
        <div class="bg">
          <img :src="profile.backgroundUrl" alt="">
        </div>
        <div class="user-box">
          <div class="avatar">
            <img :src="profile.avatarUrl" alt="">
          </div>
          <h2 class="username">{{profile.nickname}}</h2>
          <div class="sex">性别: {{handleGender}}</div>
        </div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>等级:</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>年龄:</td>
              <td>{{profile.birthday}}</td>
            </tr>
            <tr>
              <td></td>
              <td>地区:</td>
              <td>{{profile.province}}</td>
            </tr>
          </tbody>
        </table>
        <div class="follow">
          <div class="l-f item">
            <span>动态</span>
            <span>{{profile.eventCount}}</span>
          </div>
          <div class="c-f item">
            <span>关注</span>
            <span>{{profile.follows}}</span>
          </div>
          <div class="r-f item">
            <span>粉丝</span>
            <span>{{profile.followeds}}</span>
          </div>
        </div>
        <div class="button">
          <router-link to="/" tag="a">个人设置</router-link>
          <router-link to="/" tag="a">我的等级</router-link>
        </div>
      </div>
      <div class="center">
        <div class="header">
          <div class="left-info">
            <span class="title">听歌排行</span>
            <span class="count">(累计听歌{{profile.playlistCount}}首)</span>
          </div>
          <div class="right-handle">
            <span class="new" @click="changeType(1)" :class="{'active': playRecordType === 1}">最近一周</span>
            <span class="all" @click="changeType(0)" :class="{'active': playRecordType === 0}">所有时间</span>
          </div>
        </div>
        <div class="container">
          <play-list
            v-if="playRecordList.length !== 0"
            :playListTable="playRecordList"
            :isShowCollection="false">
          </play-list>
          <div class="avatar" v-else>
            <img src="../assets/images/empty.png" alt="">
            <p>ta可能什么都不想让我们看到</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="created-song-sheet">
          <h2>我创建的歌单</h2>
          <song-sheet-list :song-sheet-list="createdPlayList"></song-sheet-list>
        </div>
        <div class="collection">
          <h2>我收藏的歌单</h2>
          <song-sheet-list :song-sheet-list="collectionPlayList"></song-sheet-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import SongSheetList from "../components/common/SongSheetList";
  import PlayList from "../components/playlistdetail/PlayList";
  export default {
    name: "Profile",
    components: {
      SongSheetList,
      PlayList
    },
    data() {
      return {
        // 我创建的歌单
        createdPlayList: [],
        // 我收藏的歌单
        collectionPlayList: [],
        // 播放记录的type值
        playRecordType: 1,
        // 播放记录列表
        playRecordList: []
      }
    },
    computed: {
      // 处理性别
      handleGender() {
        if (this.profile.gender === 0) {
          return "保密"
        } else if (this.profile.gender === 1) {
          return "男"
        } else {
          return "女"
        }
      },
      ...mapGetters([
        "profile"
      ])
    },
    methods: {
      // 切换一周或所有的播放记录
      changeType(type) {
        this.playRecordType = type
        this._getUserPlayRecord()
      },
      // 获取用户播放记录
      async _getUserPlayRecord() {
        try {
          this.playRecordList = []
          let params = {
            uid: this.profile.userId,
            type: this.playRecordType,
            timeStamp: new Date().valueOf()
          }
          let res = await this.$api.getUserPlayRecord(params)
          if (res.data.code === 200) {
            let list = res.data.weekData ? res.data.weekData : res.data.allData
            list.map(item => {
              let obj = {}
              obj.id = item.song.s_id
              obj.picUrl = item.song.al.picUrl
              obj.singer = item.song.ar.map(item => item.name).join("/")
              obj.song = item.song.name
              obj.album = item.song.al.name
              obj.transitionTime = item.song.dt
              this.playRecordList.push(obj)
            })
          }
        } catch (err) {
          console.log(err)
        }
      },
      // 获取用户歌单
      async _getUserPlayList() {
        try {
          let uid = this.profile.userId
          let res = await this.$api.getUserPlayList(uid)
          if (res.data.code === 200) {
            let list = res.data.playlist
            list.map(item => {
              if (item.userId === this.profile.userId) {
                this.createdPlayList.unshift(item)
              } else {
                this.collectionPlayList.unshift(item)
              }
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取用户播放记录
      this._getUserPlayRecord()
      // 获取用户歌单
      this._getUserPlayList()
    }
  }
</script>

<style lang="less">
.profile{
  padding: 65px 0 0 !important;
  .bg-image{
    width: 100%;
    height: 350px;
    background-image: url("../assets/images/personal.jpg");
    background-position: center;
    background-size: 100% 100%;
    background-attachment: fixed;
    &::before{
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(243, 112, 102, 22%);
    }
  }
  .profile-container{
    padding: 20px;
    display: flex;
    align-items: flex-start;
    .left{
      background-color: #fff;
      border-radius: 4px;
      width: 23%;
      min-width: 300px;
      box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
      margin-top: -80px;
      .bg{
        width: 100%;
        height: 150px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        &::before{
          position: absolute;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 87, 34, 33%);
          border-radius: 4px;
        }
      }
      .user-box{
        display: flex;
        position: relative;
        padding: 10px;
        .avatar{
          width: 65px;
          height: 65px;
          position: absolute;
          top: -20px;
          left: 30px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
        .username{
          margin-left: 110px;
        }
        .sex{
          margin-left: 15px;
        }
      }
      table{
        margin: 15px 0 0 35px;
        tbody{
          width: 200px;
          tr{
            td{
              padding: 4px;
              font-size: 12px;
            }
            td:first-child{
              &::before{
                content: "";
                display: block;
                height: 6px;
                width: 6px;
                background-color: #FA2800;
                border-radius: 100%;
              }
            }
          }
        }
      }
      .follow{
        display: flex;
        justify-content: center;
        color: #958ebb;
        .item{
          display: flex;
          flex-direction: column;
          padding: 20px;
          align-items: center;
        }
      }
      .button{
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        a{
          padding: 10px;
          background-color: #FA2800;
          border-radius: 7px;
          color: #fff;
          margin-right: 10px;
        }
      }
    }
    .center{
      min-width: 620px;
      min-height: 360px;
      width: 45%;
      box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
      border-radius: 10px;
      margin-left: 20px;
      padding: 14px;
      .header{
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
        color: #666;
        .title{
          padding-left: 10px;
          border-left: 3px solid #FA2800;
          font-weight: 700;
          margin-right: 6px;
          color: black;
        }
        .count{
          font-size: 12px;
        }
        .new,.all{
          font-size: 12px;
        }
        .new{
          padding-right: 10px;
          border-right: 2px solid #999;
          margin-right: 10px;
        }
        .active{
          color: #FA2800;
        }
      }
      .container{
        .avatar{
          img{
            width: 100%;
            height: 100%;
          }
          p{
            text-align: center;
          }
        }
        .play-list-container{
          margin-top: 20px;
        }
      }
    }
    .right{
      width: 30%;
      min-width: 490px;
      margin-left: 20px;
      .collection,.created-song-sheet{
        box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        h2{
          padding-left: 15px;
          border-left: 3px solid #FA2800;
          margin-bottom: 12px;
        }
        .song-sheet-list{
          width: 100%;
          .container{
            justify-content: flex-start;
            .group{
              flex: 0 0 24.5%;
              max-width: none;
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>
