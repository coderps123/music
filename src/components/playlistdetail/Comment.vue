<template>
  <div class="comment">
    <h2>精彩评论</h2>
    <ul class="hot-comments">
      <li v-for="comment in hotComments">
        <img class="avatar" :src="comment.user.avatarUrl + '?params=50y50'" alt="">
        <i class="iconfont iconhot"></i>
        <div class="comment-info">
          <h3>
            {{comment.user.nickname}}
            <span>{{$utils.formatDate(comment.time, 6)}}</span>
          </h3>
          <p>{{comment.content}}</p>
        </div>
      </li>
    </ul>
    <ul class="comments">
      <li v-for="comment in comments">
        <img class="avatar" v-lazy="comment.user.avatarUrl + '?params=50y50'" alt="">
        <div class="comment-info">
          <h3>
            {{comment.user.nickname}}
            <span>{{$utils.formatDate(comment.time, 6)}}</span>
          </h3>
          <p>{{comment.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    props: {
      hotComments: {
        type: Array,
        default() {
          return []
        }
      },
      comments: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .comment{
    ul{
      li{
        display: flex;
        margin: 10px 10px 20px 10px;
        i{
          color: #FA2800;
        }
        .avatar{
          width: 45px;
          height: 45px;
          border-radius: 100%;
        }
        .comment-info{
          margin-left: 14px;
          flex: 1;
          h3{
            span{
              color: #a5a5c1;
              font-weight: 200;
            }
          }
          p{
            background-color: #f5f5f5;
            color: #666;
            font-size: 12px;
            padding: 6px 8px;
            line-height: 1.5em;
            margin-top: 10px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
