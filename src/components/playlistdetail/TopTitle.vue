<template>
  <div class="top-title">
    <div class="cover">
      <img v-lazy="playList.coverImgUrl" alt="">
    </div>
    <div class="detail-container">
      <h1>{{playList.name}}</h1>
      <div class="icon-area">
        <img v-lazy="playList.creator.avatarUrl" alt="">
        <span class="nick-name">{{playList.creator.nickname}}</span>
        <span class="create-time">{{playList.createTime | formatDate}}</span>
      </div>
      <p class="tags" v-if="playList.tags.length > 0">
        标签: <span class="tag" v-for="(tag, index) in playList.tags" :key="index" @click="goToSongSheetPage(tag)">{{tag}}</span>
      </p>
      <p class="des" >{{playList.description}}</p>
      <span v-if="txtLength(playList.description)" @click="openDialog">全部
        <i class="iconfont iconjiantouyou"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopTitle",
    components: {
    },
    props: {
      playList: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      txtLength() {
        return function(txt) {
          return txt.length > 8
        }
      },
    },
    filters: {
      formatDate(time) {
        // 转化时间戳
        // let date = new Date(time*1000);//如果date为13位不需要乘1000
        let date = new Date(time)
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D+"创建";
      },
    },
    methods: {
      // 点击打开弹窗
      openDialog() {
        this.$emit("openDialog", true)
      },
      // 跳转到歌单页面
      goToSongSheetPage(tag) {
        // console.log(this.$router);
        this.$router.push({
          path: "/song_sheet",
          query: {
            tag
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .top-title {
    display: flex;

    .cover {
      position: relative;
      z-index: 2;
      height: 200px;
      width: 200px;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        position: absolute;
        z-index: 3;
      }

      &::before {
        content: "";
        display: block;
        width: 95%;
        height: 95%;
        background-color: #8c8c8c;
        position: absolute;
        top: 14px;
        right: -4px;
        border-radius: 8px;
        z-index: 1;
      }
    }

    .detail-container {
      margin: 10px 30px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      h1 {
        font-size: 24px;
        padding-bottom: 20px;
      }

      .icon-area {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img {
          border-radius: 100%;
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
        .nick-name:hover{
          color: #FA2800;
        }
        img,.nick-name{
          cursor: pointer;
        }

        .create-time {
          margin-left: 30px;
        }
      }

      .tags {
        margin-bottom: 10px;

        .tag {
          padding: 6px 14px;
          background-color: #FA2800;
          font-size: 12px;
          color: #fff;
          border-radius: 50px;
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .des {
        margin: 10px 0;
        line-height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp: 2; //显示的行
      }

      > span {
        color: #FA2800;
        cursor: pointer;

        i {
          font-size: 12px;
        }
      }
    }
  }
</style>
