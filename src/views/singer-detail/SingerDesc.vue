<template>
  <div class="singer-desc">
    info
  </div>
</template>

<script>
  export default {
    name: "SingerDesc",
    data() {
      return {

      }
    },
    methods: {
      async _getSingerDesc() {
        let res = await this.$api.getSingerDesc(this.$route.params.id)
        console.log(res)
      }
    },
    created() {
      this._getSingerDesc()
    }
  }
</script>

<style scoped>

</style>
