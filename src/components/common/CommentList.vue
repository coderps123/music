<template>
  <div class="comment-list">
    <h2>最新评论</h2>
    <div v-if="comments.length === 0">该mv暂无评论信息, 请您欣赏</div>
    <ul v-if="comments.length !== 0">
      <li v-for="comment in comments" :key="comment.commentId">
        <div class="cover">
          <img :src="comment.user.avatarUrl" alt="">
        </div>
        <div class="area-text">
          <div class="comment-person-info">
            <div class="left">
              <span class="nickname">{{comment.user.nickname}}</span>
              <span class="time">{{$utils.formatDate(comment.time)}}</span>
            </div>
            <div class="right">
              <span class="dian-zan">
                <i class="iconfont icondianzan" :class="comment.liked ? 'icon-active' : ''"></i>
                ({{comment.likedCount}})
              </span>
              <span class="xin-xi">
                <i class="iconfont iconxinxi"></i>
              </span>
            </div>
          </div>
          <p class="content">{{comment.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "CommentList",
    props: {
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
  .comment-list{
    h2{
      margin: 20px 0;
    }
    ul{
      li{
        display: flex;
        padding: 10px 0 20px;
        .cover{
          width: 45px;
          height: 45px;
          border-radius: 100%;
          margin-right: 15px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .area-text{
          width: 100%;
          .comment-person-info{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .left{
              .nickname{
                font-size: 14px;
                font-weight: 600;
                padding-right: 10px;

              }
            }
            .right{
              .dian-zan{
                margin-right: 10px;
              }
              span{
                padding: 3px;
              }
            }
          }
          p.content{
            padding: 10px;
            margin-top: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
            font-size: 12px;
            color: #4a4a4a;
          }
        }
      }
    }
  }
</style>
