<template>
  <div class="wrapper">
    <div class="group" v-for="item in this.singers" :key="item.id" @click="singerDetail(item.id)">
      <a href="javascript:;">
        <img v-lazy="item.picUrl" alt="">
        <h3>{{item.name}}</h3>
        <span v-if="isShowSongCount">单曲数{{item.musicSize}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SingerList",
    props: {
      singers: {
        type: Array,
        default() {
          return []
        }
      },
      isShowSongCount: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      singerDetail(id) {
        this.$router.push({path: `/singer-detail/${id}`})
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .group{
      flex: 0 0 10%;
      padding: 10px;
      text-align: center;
      img{
        width: 90px;
        height: 90px;
        border-radius: 100%;
        box-shadow: 0 0 4px rgba(1, 2, 3, 0.7);
      }
      h3{
        margin: 10px 0;
      }
      span{
        color: #fa2800;
        font-size: 12px;
      }
    }
  }
</style>
