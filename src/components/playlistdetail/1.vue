<template>
  <div class="play-bar">
    <div class="centent">
      <div class="avatar">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <div class="info">
        <h2>{{currentSong.song}}</h2>
        <p>{{currentSong.singer}}</p>
      </div>
      <div class="controller">
        <i class="iconfont iconnext" @click="playPrevSong"></i>
        <i class="iconfont iconbofang4" v-show="isPlay" @click="startPlay"></i>
        <i class="iconfont iconbofang3" v-show="!isPlay" @click="pausePlay"></i>
        <i class="iconfont iconprev" @click="playNextSong"></i>
      </div>
      <div class="play-progress">
        <span class="current-time">{{currentTime | formatCurrentTime}}</span>
        <el-slider
          v-model="sliderValue"
          :max="this.currentSong.transitionTime / 1000"
          :format-tooltip="formatToolTip"
          @change="setProgress">
        </el-slider>
        <span class="total-time">{{songTime}}</span>
      </div>
      <div class="volnum-control">
        <i :class="isMutedIcon" @click="mutedClick"></i>
        <el-slider
          v-model="volumeSlider"
          @change="setVolume(volumeSlider)">
        </el-slider>
      </div>
      <div class="icon-button">
        <i class="iconfont iconxunhuan" :class="{'active-icon': playMode === 'orderPlay'}" @click="orderPlay"></i>
        <i class="iconfont icondanquxunhuan" :class="{'active-icon': playMode === 'oneLoop'}" @click="oneLoop"></i>
        <i class="iconfont iconplay-random" :class="{'active-icon': playMode === 'randomPlay'}" @click="randomPlay"></i>
        <i class="iconfont icongeci" @click="openLyric"></i>
        <i class="iconfont iconplaylsit" @click="openPlayRecord"></i>
      </div>

      <audio :src="playUrl"
             :muted="isMuted"
             ref="audio"
             @timeupdate="timeupdate"
             @ended="ended"
             @error="error">
      </audio>

      <div class="lyric" v-show="isOpenLyric">
        <h2>歌词</h2>
        <scroll ref="lyricList">
          <div v-if="currentLyric">
            <div class="lyric-wrapper">
              <p ref="lyricLine" v-for="(item, index) in currentLyric.lines"
                 :class="currentLineNum === index ? 'active-lyric-text' : ''">
                {{item.time}}---{{item.txt}}
              </p>
            </div>
          </div>
        </scroll>
      </div>
      <div class="play-list" v-show="isOpenPlayRecord">
        <h2>
          播放记录
          <i class="iconfont iconlajitong" @click="deleteAll"></i>
        </h2>
        <div class="play-list-table">
          <table>
            <thead>
            </thead>
            <tbody>
            <play-transition
              v-for="(item, index) in playRecord"
              :key="item.id"
              :isShowTdItem="false"
              :item="item"
              :index="index">
            </play-transition>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayTransition from "../common/PlayButton";
  import { mapGetters, mapMutations} from "vuex"
  import Lyric from "lyric-parser"
  import Scroll from "../common/Scroll"
  export default {
    name: "PlayBar",
    components: {
      PlayTransition,
      Scroll
    },
    data() {
      return {
        // 进度条值
        sliderValue: 0,
        // 控制歌词显隐
        isOpenLyric: false,
        // 控制播放列表的显隐
        isOpenPlayRecord: false,
        // 当前时长
        currentTime: 0,
        // 音量
        volumeSlider: 40,
        // audio 元素
        audio: null,
        // 是否静音
        isMuted: false,
        // 当前行号
        currentLineNum: 0,
        // 当前歌词对象
        currentLyric: null
      }
    },
    filters: {
      // 格式化当前时间
      formatCurrentTime(time) {
        let m = parseInt(time / 60)
        let s = parseInt(time % 60)
        if (s < 10) {
          s = "0" + s
        }
        if (m < 10) {
          m = "0" + m
        }
        return m + ":" + s
      }
    },
    computed: {
      // 歌曲总时长
      songTime() {
        return this.$utils.formatSongTime(this.currentSong.transitionTime)
      },
      // 是否显示静音图标
      isMutedIcon() {
        return this.isMuted ? "iconfont iconjingyin" : "iconfont iconshengyin"
      },
      playUrl() {
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
      },
      ...mapGetters([
        "currentSong",
        "playRecord",
        "isPlay",
        "playMode",
        "playList"
      ])
    },
    methods: {
      // 顺序播放
      orderPlay() {
        // 改变icon图标
        this.setPlayMode('oneLoop')
      },
      // 单曲循环播放
      oneLoop() {
        // 改变icon图标
        this.setPlayMode('randomPlay')
      },
      // 循环播放
      randomPlay() {
        // 改变icon图标
        this.setPlayMode('orderPlay')
      },
      // 媒体下载过程中错误。例如突然无网络了。或者文件地址不对。
      error() {
        this.$message.error("抱歉, 媒体下载发生了错误!")
        this.setCurrentSongError(true)
        // 自动播放下一首歌曲
        this.playNextSong()
        setTimeout(() => {
          this.audio.play()
        }, 20)
      },
      // 音频文件播放完毕时
      ended() {
        if (this.playMode === 'orderPlay') {
          // 自动播放下一首歌曲
          this.playNextSong()
          setTimeout(() => {
            this.audio.play()
          }, 20)
        } else if (this.playMode === 'oneLoop') {
          this.setCurrentSong(this.currentSong)
          setTimeout(() => {
            this.audio.play()
          }, 20)
        } else if (this.playMode === 'randomPlay') {
          this.setCurrentSong(this.playList[parseInt(Math.random() * this.playList.length)])
          setTimeout(() => {
            this.audio.play()
          }, 20)
        }
        // 获取歌词
        this._getCurrentSongLyric(this.currentSong.id)
      },
      // 重置 sliderValue 值, 使得从头开始播放
      resetSliderValue() {
        this.sliderValue = 0
      },
      // 改变当前时间
      setProgress(afterChangeTime) {
        // this.sliderValue = this.audio.currentTime = afterChangeTime
        console.log(this.currentSong.transitionTime);
        console.log(afterChangeTime)
        // this.audio.currentTime = (afterChangeTime * 1000)
        this.audio.currentTime = (parseInt(afterChangeTime) * 1000 / this.currentSong.transitionTime) * this.currentSong.transitionTime / 1000
        console.log(this.sliderValue);

        // console.log(this.audio.currentTime)
      },
      // 格式化formatToolTip文本
      formatToolTip(time) {
        let m = parseInt(time / 60)
        let s = parseInt(time % 60)
        if (s < 10) {
          s = "0" + s
        }
        if (m < 10) {
          m = "0" + m
        }
        return m + ":" + s
      },
      // 监听播放时间的改变
      timeupdate(e) {
        this.sliderValue = this.currentTime = e.target.currentTime
        // console.log(parseInt(this.currentTime*1000))
      },
      // 静音按钮点击事件
      mutedClick() {
        if (this.isMuted) {
          this.isMuted = false
          this.audio.muted = false
        } else {
          this.isMuted = true
          this.audio.muted = true
        }
      },
      // 开始播放
      startPlay() {
        this.isPlayMutation(!this.isPlay)
        this.audio.play()
        // 歌词的播放/ 暂停
        this.lyricTogglePlay()
      },
      // 暂停播放
      pausePlay() {
        this.isPlayMutation(!this.isPlay)
        this.audio.pause()
        // 歌词的播放/ 暂停
        this.lyricTogglePlay()
      },
      // 播放上一首歌曲
      playPrevSong() {
        this.setPlayPrevSong()
        this.isPlayMutation(false)
        this.sliderValue = 0
        setTimeout(() => {
          this.audio.play()
        }, 20)
        // 获取歌词
        this._getCurrentSongLyric(this.currentSong.id)
      },
      // 播放下一首歌曲
      playNextSong() {
        this.setPlayNextSong()
        this.isPlayMutation(false)
        this.sliderValue = 0
        setTimeout(() => {
          this.audio.play()
        }, 20)
        // 获取歌词
        this._getCurrentSongLyric(this.currentSong.id)
      },
      // 控制播放声音
      setVolume(volumeSlider) {
        if (this.$refs.audio) {
          this.$refs.audio.volume = volumeSlider / 100
        }
      },
      // 打开播放列表
      openPlayRecord() {
        this.isOpenPlayRecord = !this.isOpenPlayRecord
        this.isOpenLyric = false
      },
      // 清空播放列表
      deleteAll() {
        this.$store.commit("deleteAll")
      },
      // 点击打开歌词弹窗, 并获取当前歌曲歌词
      openLyric() {
        this.isOpenLyric = !this.isOpenLyric
        this.isOpenPlayRecord = false
      },
      // 歌词的重新播放
      lyricPlay() {
        setTimeout(() => {
          this.currentLyric.play()
        }, 20)
      },
      // 歌词的播放/暂停
      lyricTogglePlay() {
        console.log("歌词播放/暂停")
        setTimeout(() => {
          // 歌词的播放/暂停
          this.currentLyric.togglePlay()
        }, 20)
      },
      // 获取歌词
      async _getCurrentSongLyric(currentSongId) {
        try {
          let res = await this.$api.getCurrentSongLyric(currentSongId)
          if (res.status === 200 && res.statusText === "OK") {
            let lyric = res.data.lrc.lyric
            this.currentLyric = new Lyric(lyric, this.handleLyric)
            this.currentLyric.play()
            console.log(this.currentLyric)
          }
        } catch (err) {
          console.log(err)
        }
      },
      handleLyric({lineNum, txt}) {
        if (this.$refs.lyricList) {
          this.$refs.lyricList.refresh()
        }
        this.currentLineNum = lineNum
        if (lineNum > 10) {
          let lineEl = this.$refs.lyricLine[lineNum - 10]
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollToElement(lineEl, 1000)// 滚动到元素
            })
          }
        } else {
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              // this.$refs.lyricList.scrollTo(0, 0, 1000)// 滚动到顶部
            })
          }
        }
      },
      ...mapMutations([
        "setPlayPrevSong",
        "setPlayNextSong",
        "isPlayMutation",
        "getAudio",
        "setCurrentSongError",
        "setPlayMode",
        "setCurrentSong"
      ])
    },
    created() {
      // 获取歌词
      this._getCurrentSongLyric(this.currentSong.id)
    },
    mounted() {
      this.audio = this.$refs.audio
      this.getAudio(this.$refs.audio)
      this.audio.volume = this.volumeSlider / 100
      this.$bus.$on("resetSliderValue", () => {
        this.sliderValue = 0
      })
      this.$bus.$on("getCurrentSongLyric", id => {
        this._getCurrentSongLyric(id)
      })
      if (this.$refs.lyricList) {
        this.$refs.lyricList.refresh()
      }
      // 歌词播放/暂停
      this.$bus.$on("lyricTogglePlay", () => {
        console.log("playList 播放")
        this.lyricTogglePlay()
      })
    },
    beforeDestroy() {
      this.$bus.$off("resetSliderValue")
    }
  }
</script>

<style lang="less">
  .play-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 1230px;
    background-color: #fff;
    box-shadow: 0 -5px 40px rgba(2, 10, 18, .1);
    .centent{
      width: 1350px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: 75px;
      position: relative;
      .avatar{
        width: 65px;
        height: 65px;
        margin: 0 20px 0 20px;
        border: 0;
        flex: 0 0 auto;
        img{
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      .info{
        width: 120px;
        h2,p{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
        }
        h2{
          padding-bottom: 10px;
          font-size: 14px;
          color: #333;
        }
        p{
          color: #999;
          font-size: 12px;
        }
      }
      .controller{
        width: 120px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        .iconfont{
          padding: 10px;
          font-size: 20px;
        }
        .iconbofang4,.iconbofang3{
          font-size: 30px;
        }
      }
      .play-progress{
        display: flex;
        align-items: center;
        margin: 0 40px;
        .el-slider{
          width: 280px;
          margin: 0 30px;
          .el-slider__runway{
            height: 3px;
            .el-slider__bar{
              height: 3px;
              background-color: #FA2800;

            }
            .el-slider__button-wrapper{
              top: -17px;
              .el-slider__button{
                width: 10px !important;
                height: 10px;
                border-color: #FA2800;
              }
            }
          }
        }
      }
      .volnum-control{
        display: flex;
        align-items: center;
        margin-left: 10px;
        i{
          font-size: 26px;
          font-weight: 700;
          color: #FA2800;
        }
        .el-slider{
          width: 130px;
          margin: 0 20px;
          .el-slider__runway{
            height: 3px;
            .el-slider__bar{
              height: 3px;
              background-color: #FA2800;

            }
            .el-slider__button-wrapper{
              top: -17px;
              .el-slider__button{
                width: 10px !important;
                height: 10px;
                border-color: #FA2800;
              }
            }
          }
        }
      }
      .icon-button{
        margin-left: 150px;
        i{
          padding: 6px;
          font-size: 20px;
          margin-right: 20px;
        }
        .iconxunhuan,.icondanquxunhuan,.iconplay-random{
          display: none;
        }
        .active-icon{
          display: inline !important;
        }
      }
      .lyric,.play-list{
        position: absolute;
        bottom: 90px;
        right: 0px;
        width: 400px;
        height: 550px;
        box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
        background-color: #fff;
        border-radius: 4px;
        z-index: 1000;
      }
      .lyric{
        padding: 20px 30px;
        h2{
          padding-bottom: 20px;
          background-color: #fff;
        }
        .wrapper{
          height: 460px;
          overflow: auto;
          div{
            width: 100%;
            p{
              color: #4a4a4a;
              font-size: 14px;
              font-weight: 300;
              line-height: 24px;
              margin: 5px 0;
            }
            .active-lyric-text{
              color: #FA2800;
            }
          }
        }
      }
      .play-list{
        padding: 20px;
        h2{
          padding: 10px 10px 20px 10px;
          font-weight: 400;
          i{
            float: right;
            margin-right: 12px;
          }
        }
        & i:hover{
          color: #FA2800;
        }
        .play-list-table{
          height: 90%;
          padding-bottom: 20px;
          width: 100%;
          overflow: auto;
          table{
            width: 100%;
            margin-top: 10px;
            tbody{
              tr td{
                width: 40px;
                height: 40px;
              }
              .song{
                padding-left: 10px;
                width: 70%;
                overflow: hidden;
              }
              .delete{
                width: 60px;
                text-align: center;
                i{
                  font-size: 14px;
                  font-weight: 400;
                }
              }
            }
          }
        }
      }
      i:active{
        color: #FA2800;
        opacity: .8;
      }
      i{
        cursor: pointer;
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
