<template>
  <div class="subscribers">
    <h2>喜欢这个歌单的人</h2>
    <ul>
      <li v-for="item in subscribers">
        <img v-lazy="item.avatarUrl + '?params=50y50'" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SubScribers",
    props: {
      subscribers: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .subscribers{
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 4px;
        img{
          width: 40px;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
  }
</style>
