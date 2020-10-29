<template>
  <div class="play-list-container">
    <div class="handle clearfix">
      <span v-if="isShowCollection">
        <i class="iconfont iconshoucang"></i>
        收藏
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
      <play-transition
        v-for="(item, index) in playListTable"
        :key="item.id"
        :item="item"
        :index="index"
        :playList="playListTable">
      </play-transition>
      </tbody>
    </table>
  </div>
</template>

<script>
  import PlayTransition from "./PlayButton";
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
      isShowCollection: {
        type: Boolean,
        default: true
      }
    },
    components: {
      PlayTransition
    },
    data() {
      return {
        currentIndex: -1,
        iIsShow: true,
      }
    },
    computed: {
      ...mapGetters([
        "currentSong",
        "playList",
        "playRecord",
        "isPlay",
        "playMode"
      ])
    },
    methods: {
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
      }
    }

    .clearfix::before {
      content: "";
      display: block;
      clear: both;
    }
  }
</style>
