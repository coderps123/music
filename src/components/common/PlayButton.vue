<template>
  <div class="play-button" :class="addClass">
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
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  export default {
    name: "PlayButton",
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
    },
    computed: {
      // 添加class类
      addClass() {
        return (this.currentSong.id === this.item.id && !this.isPlay) ? 'playing': ''
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
        // 加入播放记录
        this.addPlayRecord()
        console.log(100)
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
      ...mapMutations([
        "isPlayMutation",
        "play",
        "pause",
        "setPlayList",
        "setCurrentSong",
        "addPlayRecord"
      ])
    }
  }
</script>

<style scoped lang="less">

  .play-button{
    .iconbofang1,.iconzantingtingzhi,.playing-transition{
      display: none;
    }
    i{
      color: #FA2800;
      font-size: 20px;
    }
  }
  tr:hover{
    .play-button{
      .num{
        display: none;
      }
      .iconbofang1{
        display: block;
      }
    }
    .playing{
      .playing-transition{
        display: none;
      }
      .iconzantingtingzhi{
        display: block;
      }
      .iconbofang1{
        display: none;
      }
    }
  }
  .playing{
    .iconbofang1{
      display: none;
    }
    .playing-transition{
      display: flex;
    }
    .num{
      display: none;
    }
  }
  .playing:hover{
    .playing-transition{
      display: none;
    }
  }

  .playing{
    display: flex;
    justify-content: center;
    .playing-transition{
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

  @-webkit-keyframes play {
    from{
      -webkit-transform: translateY(0px);
    }
    to{
      -webkit-transform: translateY(15px);
    }
  }
</style>
