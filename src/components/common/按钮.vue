<template>
  <tr class="play-tr">
    <td :class="addClass">
      <div class="index-container">
        <span class="num" ref="num">{{index + 1 | handleIndex}}</span>
        <i class="iconfont iconbofang1" @click="startPlay(item)"></i>
        <i class="iconfont iconzantingtingzhi" @click="pausePlay()"></i>
        <div class="playing-transition" ref="playing-transition">
          <div class="line" style="animation-delay: -1.2s;"></div>
          <div class="line"></div>
          <div class="line" style="animation-delay: -1.5s;"></div>
          <div class="line" style="animation-delay: -0.9s;"></div>
          <div class="line" style="animation-delay: -0.6s;"></div>
        </div>
      </div>
    </td>
    <td v-if="isShowTdItem">
      <div class="avatar">
        <img :src="item.picUrl" alt="">
        <p>{{item.song}}</p>
      </div>
    </td>
    <td v-if="isShowTdItem">{{item.singer}}</td>
    <td v-if="isShowTdItem">{{item.album}}</td>
    <td v-if="isShowTdItem">{{item.transitionTime | formatPlayTime}}</td>
    <td v-if="!isShowTdItem" class="song">
      {{item.song}}
      <i class="iconfont iconerror" v-if="item.error" title="播放源错误!"></i>
    </td>
    <td v-if="!isShowTdItem" class="delete">
      <i class="iconfont icondelete" @click="removeItem(index)"></i>
    </td>
  </tr>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  export default {
    name: "PlayTransition",
    props: {
      playList: {
        type: Array,
        default() {
          return []
        }
      },
      item: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Number,
        default: -1
      },
      isShowTdItem: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 添加class类
      addClass() {
        return (this.currentSong.id === this.item.id && !this.isPlay) ? 'play-td': ''
      },
      ...mapGetters([
        "currentSong",
        "isPlay",
      ])
    },
    filters: {
      handleIndex(index) {
        if (index < 10) {
          return "0" + index
        } else {
          return index
        }
      },
    },
    methods: {
      // 开始播放
      startPlay(item) {
        // 将当前播放列表赋值为全局播放列表
        this.setPlayList(this.playList)
        this.isPlayMutation(false)
        if (this.currentSong.id !== item.id) {
          // 播放新的歌词
          this.$bus.$emit("lyricPlay")
        }
        // 点击获取这一行歌曲信息 保存到store中
        this.setCurrentSong(item)
        // 当同一首歌曲再次被点击播放, 则应将之前保存在播放记录中的歌曲删除, 将新歌曲添加到队列头部
        if (this.$store.state.playRecord.indexOf(item) !== -1) {
          // 先删除之前的
          this.$store.state.playRecord.splice(this.$store.state.playRecord.indexOf(item), 1)
          // 加入播放记录
          this.$store.state.playRecord.unshift(item)
        } else {
          // 加入播放记录
          this.$store.state.playRecord.unshift(item)
        }
        this.$bus.$emit("resetSliderValue")
        setTimeout(() => {
          // 歌词播放 / 暂停
          this.$bus.$emit("lyricTogglePlay")
          // 播放
          this.play()
        }, 20)
      },
      // 暂停播放
      pausePlay() {
        this.isPlayMutation(true)
        this.pause()
        // 歌词暂停
        this.$bus.$emit("lyricTogglePlay")
      },
      // 移除播放列表选择项
      removeItem(index) {
        this.$store.commit("removeItem", index)
      },
      ...mapMutations([
        "isPlayMutation",
        "play",
        "pause",
        "setPlayList",
        "setCurrentSong"
      ])
    }
  }
</script>

<style scoped lang="less">
  tr td .iconerror{
    color: #FA2800;
    margin-left: 10px;
    cursor: pointer;
  }
  tr:hover{
    td .index-container{
      .num{
        display: none !important;
      }
      .iconbofang1{
        display: block;
      }
    }
    td.play-td{
      .index-container{
        .iconbofang1{
          display: none;
        }
        .iconzantingtingzhi{
          display: block;
        }
        .playing-transition{
          display: none;
        }
      }
    }
  }
  tr.play-tr td .index-container{
    .num{
      display: block;
    }
  }
  tr.play-tr .play-td{
    .index-container{
      .playing-transition{
        display: flex;
      }
      .num{
        display: none;
      }
    }
  }
  .play-tr td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 10px;
    color: #4a4a4a;
    .index-container{
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 20px;
        color: #FA2800;
        display: none;
      }
      .playing-transition{
        display: none;
        overflow: hidden;
        height: 16px;
        min-width: 18px;
        .line{
          width: 2px;
          height: 100%;
          background-color: #FA2800;
          margin-left: 2px;
          animation: play 0.9s linear infinite alternate;
        }
      }
    }
    .avatar {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
        border-radius: 6px;
        margin-right: 10px;
      }
      P{
        width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  @-webkit-keyframes play {
    from{
      -webkit-transform: translateY(0px);
    }
    to{
      -webkit-transform: translateY(15px);
    }
  }
</style>
