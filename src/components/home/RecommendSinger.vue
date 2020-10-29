<template>
  <div class="recommend-singer" v-if="this.singers.length > 0">
    <h2>推荐歌手</h2>
    <singer-wrapper :singers="singers"></singer-wrapper>
  </div>
</template>

<script>
  import SingerWrapper from "../common/SingerList";
  export default {
    name: "RecommendSinger",
    components: {
      SingerWrapper
    },
    data() {
      return {
        singers: [],
        limit: 30, // 默认获取歌手的个数
      }
    },
    methods: {
      async _getRecommendSinger() {
        try {
          let res = await this.$api.getRecommendSinger(this.limit)
          if (res.status === 200 && res.statusText === "OK") {
            this.singers = res.data.artists
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    created() {
      this._getRecommendSinger()
    }
  }
</script>

<style scoped lang="less">
.recommend-singer{
  h2{
    padding: 30px 0 10px 0;
  }
}
</style>
