<template>
  <div class="play-list-container" v-if="playListTable.length !== 0">
    <div class="handle clearfix">
      <span v-if="isShowCollection" @click="_setPlayListCollection" :class="{'active-collec': subscribed}">
        <i class="iconfont iconshoucang"></i>
        {{collec}}
      </span>
      <span class="active-handle" @click="playAll">
        <i class="iconfont iconplay"></i>
        播放全部
      </span>
    </div>
    <table class="play-list">
      <thead>
      <tr>
        <th class="index-th">序号</th>
        <th class="song-th">歌曲</th>
        <th class="singer-th">歌手</th>
        <th class="album-th">专辑</th>
        <th class="transition-th">时长</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in playListTable" :key="item.id">
        <td>
          <play-button :item="item" :index="index" :playList="playListTable"></play-button>
        </td>
        <td>
          <div class="avatar">
            <div class="cover">
              <img v-if="item.picUrl" v-lazy="item.picUrl" alt="">
            </div>
            <p>{{item.song}}</p>
          </div>
        </td>
        <td>
          <p>{{item.singer}}</p>
        </td>
        <td>
          <p>{{item.album}}</p>
        </td>
        <td>{{item.transitionTime | formatPlayTime}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import PlayButton from "../common/PlayButton";
  import {mapGetters, mapMutations} from "vuex"
  export default {
    name: "PlayList",
    props: {
      playListTable: {
        type: Array,
        default() {
          return []
        }
      },
      // 是否收藏该歌单
      subscribed: {
        type: Boolean,
        default: false
      },
      isShowCollection: {
        type: Boolean,
        default: true
      }
    },
    components: {
      PlayButton,
    },
    data() {
      return {
        currentIndex: -1,
        iIsShow: true,
        isLoading: true
      }
    },
    computed: {
      collec() {
        return this.subscribed ? "已收藏" : "未收藏"
      },
      ...mapGetters([
        "currentSong",
        "playList",
        "playRecord",
        "isPlay",
        "playMode"
      ])
    },
    methods: {
      // 设置是否收藏歌单
      async _setPlayListCollection() {
        // 先判断你是否登录
        let loginStatus = await this.$api.getLoginStatus()
        if (!loginStatus) {
          this.$message.info("请先登录")
          return this.$router.push("/login")
        }
        let t = this.subscribed ? 2 : 1
        let params = {
          t: t,
          id: this.$route.params.id,
          timestamp: new Date().valueOf()
        }
        let res = await this.$api.setPlayListCollection(params)
        if (res.data.code === 200) {
          this.$emit("getPlayListDetail")
        }
      },
      // 播放全部
      playAll() {
        // 将当前歌单设置为全局播放列表
        this.setPlayList(this.playListTable)
        // 从索引为 0 开始播放
        this.setCurrentSong(this.playList[0])
        setTimeout(() => {
          this.play()
          // 设置播放图标
          this.setIsPlay(false)
          // 将当前歌曲加入到播放记录列表中
          if (this.playRecord.indexOf(this.currentSong) !== -1) {
            this.playRecord.splice(this.playRecord.indexOf(this.currentSong), 1)
            this.playRecord.unshift(this.currentSong)
          } else {
            this.playRecord.unshift(this.currentSong)
          }
        }, 20)
      },
      ...mapMutations([
        "setPlayList",
        "play",
        "setCurrentSong",
        "setIsPlay",
        "setPlayMode"
      ])
    }
  }
</script>

<style lang="less">
  .play-list-container {
    .handle {
      span {
        float: right;
        padding: 6px 15px;
        background-color: #cecece;
        border-radius: 50px;
        margin-left: 10px;
        cursor: pointer;
      }

      .active-handle {
        color: #fff;
        background-color: #FA2800;
      }
      .active-collec{
        color: #fff;
        background-color: #FA2800;
      }
    }

    .play-list {
      text-align: -moz-left;
      text-align: -webkit-left;
      text-align: left;
      width: 100%;
      margin-top: 20px;
      tr {
        padding: 10px;
        line-height: 50px;
        cursor: pointer;
      }
      thead {
        tr {
          background-color: #fafafa;
          th {
            padding: 0 10px;
            color: #999;
            font-weight: 400;
          }
          & .index-th {
            width: 8%;
            text-align: center;
          }

          & .song-th {
            width: 30%;
          }

          & .singer-th {
            width: 25%;
          }

          & .album-th {
            width: 27%;
          }

          & .transition-th {
            width: 10%;
          }
        }
      }
      tbody{
        tr:nth-child(2n) {
          background-color: #F7F7F7;
        }
        tr > td:first-child {
          text-align: center;
        }
        tr:hover{
          background-color: #d2d2d2;
        }
        tr td {
          .avatar{
            display: flex;
            align-items: center;
            .cover{
              width: 40px;
              height: 40px;
              img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
              }
            }
            P{
              margin-left: 15px;
              width: 60%;
            }
          }
          p{
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .clearfix::before {
      content: "";
      display: block;
      clear: both;
    }
  }
</style>
