<template>
  <div class="singer-album">
    <album-list v-if="!isLoading" :albums="hotAlbums"></album-list>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import AlbumList from "../../components/common/AlbumList";
  import Loading from "../../components/common/Loading"
  export default {
    name: "SingerAlbum",
    components: {
      AlbumList,
      Loading
    },
    data() {
      return{
        hotAlbums: [],
        isLoading: true
      }
    },
    methods: {
      // 获取歌手专辑
      async _getSingerAlbum() {
        try {
          let params = {
            id: this.$route.params.id,
            offset: 0,
            limit: 50
          }
          let res = await this.$api.getSingerAlbum(params)
          if (res.status === 200 && res.statusText === "OK") {
            this.hotAlbums = res.data.hotAlbums
            this.isLoading = false
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取歌手专辑
      this._getSingerAlbum()
    }
  }
</script>

<style scoped lang="less">
.singer-album{
  padding: 0 90px;

}
</style>
