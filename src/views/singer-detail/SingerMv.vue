<template>
  <div class="singer-mv">
    <video-list :videoList="mvs"></video-list>
  </div>
</template>

<script>
  import VideoList from "../../components/common/VideoList";
  export default {
    name: "SingerMv",
    components: {
      VideoList
    },
    data() {
      return {
        mvs: []
      }
    },
    methods: {
      async _getSingerMv() {
        let res = await this.$api.getSingerMv(this.$route.params.id)
        if (res.status === 200 && res.statusText === "OK") {
          this.mvs = res.data.mvs
        }
      }
    },
    created() {
      // 获取歌手mv
      this._getSingerMv()
    }
  }
</script>

<style scoped lang="less">

</style>
