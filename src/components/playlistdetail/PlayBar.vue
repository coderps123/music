<template>
  <div class="play-bar">
    <div class="centent">
      <div class="avatar">
        <img v-lazy="currentSong.picUrl" alt="">
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
      <div class="play-progress" @mousedown="isSetProgress = true" @mouseup="isSetProgress = false">
        <span class="current-time">{{currentTime | formatCurrentTime}}</span>
        <el-slider
          v-model="progress"
          :format-tooltip="formatToolTip"
          @change="setProgress">
        </el-slider>
        <span class="total-time">{{currentSong.transitionTime | formatPlayTime}}</span>
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

      <transition name="fade">
        <div class="lyric" v-show="isOpenLyric">
          <h2>歌词</h2>
          <scroll ref="lyricList">
            <div v-if="nolyric">暂无歌词, 请欣赏歌曲</div>
            <div v-if="!nolyric && currentLyric">
              <div class="lyric-wrapper">
                <p ref="lyricLine" v-for="(item, index) in currentLyric.lines"
                   :class="currentLineNum === index ? 'active-lyric-text' : ''">
                  {{item.txt}}
                </p>
              </div>
            </div>
          </scroll>
        </div>
      </transition>
      <transition name="fade">
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
                <tr v-for="(item, index) in playRecord" :key="item.id">
                  <td class="num">
                    <play-button :item="item" :index="index"></play-button>
                  </td>
                  <td class="song">
                    {{item.song}}
                    <i class="iconfont iconerror" v-if="item.error" title="播放源错误!"></i>
                  </td>
                  <td class="delete">
                    <i class="iconfont icondelete" @click="removeItem(index)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import PlayButton from "../common/PlayButton";
  import { mapGetters, mapMutations} from "vuex"
  import Lyric from "lyric-parser"
  import Scroll from "../common/Scroll"
  export default {
    name: "PlayBar",
    components: {
      PlayButton,
      Scroll
    },
    data() {
      return {
        // 进度条值
        progress: 0,
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
        currentLyric: null,
        // 是否在人为设置进度条
        isSetProgress: false,
        // 是否有歌词
        nolyric: false
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
    watch: {
      // 监听播放记录变化
      playRecord(ne, old) {
        window.localStorage.setItem("playRecord", JSON.stringify(this.playRecord))
      },
      // 监听当前播放状态
      isPlay(news, old) {
        console.log(news, old)
      },
      // 监听当前歌曲的变化
      currentSong(newSong, oldSong) {
        // 清空lyric-parser对象
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        // 获取歌词
        this._getCurrentSongLyric(newSong.id)
      }
    },
    methods: {
      // 移除播放列表选择项
      removeItem(index) {
        this.$store.commit("removeItem", index)
      },
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
          if (this.currentLyric && this.$refs.lyricList) {
            this.currentLyric.seek(0)
            this.currentLyric.stop()
            this.$refs.lyricList.scrollTo(0, 0, 500)
            this.currentLyric.play()
          }
        } else if (this.playMode === 'randomPlay') {
          this.setCurrentSong(this.playList[parseInt(Math.random() * this.playList.length)])
          setTimeout(() => {
            this.audio.play()
          }, 20)
        }
      },
      // 设置进度
      setProgress(percent) {
        this.isSetProgress = true
        this.$refs.audio.currentTime = (percent / 100) * this.currentSong.transitionTime / 1000
        setTimeout(() => {
          this.isSetProgress = false
        }, 20)
        // 设置进度后, 歌词的变化
        if (this.currentLyric) {
          this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
        }
        // 设置进度完后, 开启当前歌曲的播放
        this.$refs.audio.play()
        // 设置播放图标
        this.isPlayMutation(false)
      },
      // 格式化formatToolTip文本
      formatToolTip(val) {
        let time = this.currentSong.transitionTime / 1000 * val / 100
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
        if (!this.isSetProgress) {
          this.currentTime = e.target.currentTime
          this.progress = (100 * e.target.currentTime) / (this.currentSong.transitionTime / 1000)
        }
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
        this.progress = 0
        setTimeout(() => {
          this.audio.play()
        }, 20)
      },
      // 播放下一首歌曲
      playNextSong() {
        this.setPlayNextSong()
        this.isPlayMutation(false)
        this.progress = 0
        setTimeout(() => {
          this.audio.play()
        }, 20)
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
      // 点击打开歌词弹窗,
      openLyric() {
        this.isOpenLyric = !this.isOpenLyric
        this.isOpenPlayRecord = false
      },
      // 歌词的重新播放
      lyricPlay() {
        setTimeout(() => {
          if (this.currentLyric) {
            this.currentLyric.play()
          }
        }, 20)
      },
      // 歌词的播放/暂停
      lyricTogglePlay() {
        setTimeout(() => {
          // 歌词的播放/暂停
          if (this.currentLyric) {
            this.currentLyric.togglePlay()
          }
        }, 20)
      },
      initLyric(lyric) {
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        // 如果歌曲处于播放状态, 则播放歌词
        if (!this.isPlay) {
          this.currentLyric.play()
        }
      },
      // 获取歌词
      async _getCurrentSongLyric(currentSongId) {
        try {
          let res = await this.$api.getCurrentSongLyric(currentSongId)
          if (res.status === 200 && res.statusText === "OK") {
            if (res.data.nolyric) {
              this.nolyric = true
              return
            }
            let lyric = res.data.lrc.lyric
            this.initLyric(lyric)
            // 获取到新的歌词要滚动到顶部
            if (this.$refs.lyricList) {
              console.log("滚动到顶部")
              this.$refs.lyricList.scrollTo(0, 0, 500)
            }
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
        if (lineNum > 7) {
          let lineEl = this.$refs.lyricLine[lineNum - 7]
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollToElement(lineEl, 1000)// 滚动到元素
            })
          }
        } else {
        }
      },
      ...mapMutations([
        "setPlayPrevSong",
        "setPlayNextSong",
        "getAudio",
        "setCurrentSongError",
        "setPlayMode",
        "setCurrentSong",
        "isPlayMutation",
        "setPlayRecord"
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
      this.$bus.$on("resetProgress", () => {
        this.progress = 0
      })
      if (this.$refs.lyricList) {
        this.$refs.lyricList.refresh()
      }
      // 歌词播放
      this.$bus.$on("lyricPlay", () => {
        this.lyricPlay()
      })
      // 歌词播放/暂停
      this.$bus.$on("lyricTogglePlay", () => {
        this.lyricTogglePlay()
      })
    },
    beforeDestroy() {
      this.$bus.$off("resetProgress")
    }
  }
</script>

<style lang="less">
  .play-list-table tr td .iconerror{
    color: #FA2800;
    margin-left: 10px;
    cursor: pointer;
  }
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
          .content{
            div{
              width: 100%;
              p{
                color: #4a4a4a;
                font-size: 14px;
                font-weight: 300;
                line-height: 24px;
                margin: 5px 0;
                text-align: center;
              }
              .active-lyric-text{
                color: #FA2800;
                font-size: 18px;
              }
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
              .num{
                text-align: center;
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
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate(0, -100px);
  }
</style>
