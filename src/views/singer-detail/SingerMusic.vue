<template>
  <div class="singer-music">
    <play-list :play-list-table="playList" :isShowCollection="false"></play-list>
  </div>
</template>

<script>
  import PlayList from "../../components/playlistdetail/PlayList";
  export default {
    name: "SingerMusic",
    components: {
      PlayList
    },
    data() {
      return {
        playList: []
      }
    },
    methods: {
      async _getSingerSingle(id) {
        try {
          let params = {
            id: id,
            timeStamp: new Date().valueOf()
          }
          let res = await this.$api.getSingerSingle(params)
          if (res.status === 200 && res.statusText === "OK") {
            res.data.hotSongs.forEach((item) => {
              let obj = {}
              obj.song = item.name
              obj.singer = item.ar[0].name
              obj.album = item.al.name
              obj.transitionTime = item.dt
              obj.picUrl = item.al.picUrl
              obj.error = false
              obj.id = item.id
              this.playList.push(obj)
            })
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
  .singer-music{
    padding: 0 90px;
  }
</style>
