<template>
  <div class="recommend">
    <h2>相关推荐</h2>
    <ul>
      <li v-for="item in playListRecommend" :key="item.id">
        <div class="avatar">
          <img v-lazy="item.coverImgUrl+ '?params=50y50'" alt="">
        </div>
        <div class="describe">
          <h3>{{item.name}}</h3>
          <p class="des">By. {{item.creator.nickname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Recommend",
    props: {
      playListRecommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .recommend{
    margin: 20px 0;
    ul{
      li{
        display: flex;
        margin: 16px 0;
        cursor: pointer;
        .avatar{
          font-size: 0;
          margin: 0 15px 0 8px;
          img{
            width: 50px;
            height: 50px;
            border-radius: 4px;
          }
        }
        .describe{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h3{
            font-size: 14px;
          }
          h3:hover{
            color: #FA2800;
          }
          p{
            font-size: 12px;
            color: #A5A5C1;
          }
        }
      }
    }
  }
</style>
