<template>
  <ul>
    <li v-for="(group, index) in albums" :key="group.id">
        <span>
          <i class="iconfont iconbofang">{{group.subType || group.type}}</i>
        </span>
      <img v-lazy="group.picUrl" alt="">
      <h2>{{group.name}}</h2>
      <p>{{$utils.formatDate(group.publishTime)}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "AlbumList",
    props: {
      albums: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
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
</style>
