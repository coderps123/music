<template>
  <div class="singer-album">
    <ul>
      <li v-for="(group, index) in hotAlbums" :key="group.id">
        <span>
          <i class="iconfont iconbofang">{{group.subType}}</i>
        </span>
        <img :src="group.picUrl" alt="">
        <h2>{{group.name}}</h2>
        <p>{{$utils.formatDate(group.publishTime)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SingerAlbum",
    components: {
    },
    data() {
      return{
        hotAlbums: []
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
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      padding: 12px 10px;
      position: relative;
      span{
        position: absolute;
        padding: 3px 5px;
        background-color: #000;
        color: #fff;
        border-radius: 0 6px 0 6px;
        top: 16px;
        right: 16px;
        i{
          font-size: 12px;
        }
      }
      img{
        width: 130px;
        height: 130px;
        border-radius: 4px;
        box-shadow: 0 5px 10px rgba(2, 10, 18, .3);
      }
      h2{
        margin: 6px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 130px;
      }
    }
  }
}
</style>
