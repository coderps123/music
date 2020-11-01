<template>
  <div class="similar-singer">
    similar
  </div>
</template>

<script>
  export default {
    name: "SimilarSinger",
    data() {
      return{

      }
    },
    methods: {
      // // 获取相似歌手
      // async _getSimilarSinger() {
      //   let res = await this.$api.getSimilarSinger(this.$route.params.id.trim())
      //   console.log(res)
      //   console.log(typeof this.$route.params.id.trim())
      // }
    },
    created() {
      // 获取相似歌手
      // this._getSimilarSinger()
    }
  }
</script>

<style scoped>

</style>
