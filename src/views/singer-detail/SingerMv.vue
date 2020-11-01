<template>
  <div class="singer-mv">
    <video-list v-if="!isLoading" :videoList="mvs"></video-list>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import VideoList from "../../components/common/VideoList";
  import Loading from "../../components/common/Loading"
  export default {
    name: "SingerMv",
    components: {
      VideoList,
      Loading
    },
    data() {
      return {
        mvs: [],
        isLoading: true
      }
    },
    methods: {
      async _getSingerMv() {
        let res = await this.$api.getSingerMv(this.$route.params.id)
        if (res.status === 200 && res.statusText === "OK") {
          this.mvs = res.data.mvs
          this.isLoading = false
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
