<template>
  <div class="comment-wrapper">
    <div class="header">
      <div class="user">
        <i class="iconfont iconmine"></i>
        <span>{{profile.nickname}}, 你好</span>
      </div>
      <div class="text-container">
        <div class="cover">
          <img :src="profile.avatarUrl" alt="">
        </div>
        <div class="text-area">
          <textarea ref="textarea" placeholder="请您畅所欲言" key="1"></textarea>
        </div>
      </div>
      <div class="submit clearfix">
        <div class="button" @click="addComment">提交</div>
      </div>
    </div>
    <div class="comment-list">
      <h2>最新评论</h2>
      <div v-if="comments.length === 0">暂无评论信息, 请您欣赏</div>
      <ul v-if="comments.length !== 0">
        <li v-for="comment in comments" :key="comment.commentId">
          <div class="cover">
            <img v-lazy="comment.user.avatarUrl" alt="">
          </div>
          <div class="area-text">
            <div class="comment-person-info">
              <div class="left">
                <span class="nickname">{{comment.user.nickname}}</span>
                <span class="time">{{$utils.formatDate(comment.time)}}</span>
              </div>
              <div class="right">
                <span class="dian-zan">
                  <i class="iconfont icondianzan"
                     :class="comment.liked ? 'icon-active' : ''"
                     @click="commentLikeClick(comment.commentId, comment.liked)">
                  </i>
                  ({{comment.likedCount}})
                </span>
                <span class="xin-xi">
                  <i class="iconfont iconxinxi"
                     @click="returnMessage(comment.commentId)">
                  </i>
                </span>
              </div>
            </div>
            <p class="content">{{comment.content}}</p>
            <div class="comment-box" v-if="comment.commentId === currentId">
              <div class="header">
                <div class="user">
                  <i class="iconfont iconmine"></i>
                  <span>{{profile.nickname}}, 你好</span>
                </div>
                <div class="text-container">
                  <div class="cover">
                    <img v-lazy="profile.avatarUrl" alt="">
                  </div>
                  <div class="text-area">
                    <textarea ref="textareaFloor" placeholder="请您畅所欲言" :key="comment.commentId"></textarea>
                  </div>
                </div>
                <div class="submit clearfix">
                  <div class="button" @click="_handleComment(comment.commentId)">提交</div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  export default {
    name: "CommentList",
    props: {
      comments: {
        type: Array,
        default() {
          return []
        }
      },
      _getMvComments: {
        type: Function,
        default() {
          return {};
        }
      },
      _getVideoComment: {
        type: Function,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        currentId: 0,
        floorComments: []
      }
    },
    computed: {
      ...mapGetters([
        "profile"
      ])
    },
    methods: {
      // 回复楼层信息
      returnMessage(cid) {
        this.currentId = cid
      },
      // 回复评论
      async _handleComment(cid) {
        if (this.$refs.textareaFloor[0].value.trim()) {
          if (this.$route.path.indexOf('/mv-detail') !== -1) {
            let params = {
              t: 2,
              type: 1,
              id: this.$route.params.id,
              content: this.$refs.textareaFloor[0].value.trim(),
              commentId: cid,
              timeStamp: new Date().valueOf()
            }
            let res = await this.$api.handleComment(params)
            if (res.data.code === 200) {
              this._getMvComments()
            }
          } else if (this.$route.path.indexOf("/video-detail") !== -1) {
            let params = {
              t: 2,
              type: 5,
              id: this.$route.params.id,
              content: this.$refs.textareaFloor[0].value.trim(),
              commentId: cid,
              timeStamp: new Date().valueOf()
            }
            let res = await this.$api.handleComment(params)
            if (res.data.code === 200) {
              this._getVideoComment()
            }
          }
        }
      },
      // 打开楼层评论信息
      // openCommentItem(id, floorId) {
      //   this.currentId = id
      //   this.floorComments = []
      //   if (floorId !== 0) {
      //     // 请求楼层信息数据
      //     this._getFloorComment(floorId)
      //   } else {
      //     this.$message.info("后台做了处理, 无法显示")
      //   }
      // },
      commentLikeClick(id, liked) {
        let token = window.localStorage.getItem("token")
        if (token) {
          this.$emit("commentLikeClick", id, liked)
        } else {
          this.$router.push("/login")
        }
      },
      // 添加评论
      async addComment() {
        if (this.$refs.textarea.value.trim()) {
          if (this.$route.path.indexOf('/mv-detail') !== -1) {
            let params = {
              t: 1,
              type: 1,
              id: this.$route.params.id,
              content: this.$refs.textarea.value.trim(),
              timeStamp: new Date().valueOf()
            }
            let res = await this.$api.handleComment(params)
            if (res.data.code === 200) {
              this._getMvComments()
            }
          } else if (this.$route.path.indexOf("/video-detail") !== -1) {
            let params = {
              t: 1,
              type: 5,
              id: this.$route.params.id,
              content: this.$refs.textarea.value.trim(),
              timeStamp: new Date().valueOf()
            }
            let res = await this.$api.handleComment(params)
            if (res.data.code === 200) {
              this._getVideoComment()
            }
          }
        }
      },
      // 楼层评论
      // async _getFloorComment(foolrId) {
      //   let type
      //   if (this.$route.path.indexOf("/mv-detail") !== -1) {
      //     type = 1
      //   } else if (this.$route.path.indexOf("/video-detail") !== -1) {
      //     type = 5
      //   }
      //   let params = {
      //     parentCommentId: foolrId,
      //     id: this.$route.params.id,
      //     type: type,
      //     limit: 10,
      //     timeStamp: new Date().valueOf()
      //   }
      //   let res = await this.$api.getFloorComment(params)
      //   if (res.status === 200 && res.statusText === "OK") {
      //     console.log(res)
      //     this.floorComments = res.data.data.comments || res.data.comments
      //   }
      // }
    }
  }
</script>

<style scoped lang="less">
  .comment-wrapper{
    .header{
      .user{
        margin: 20px 0;
        i{
          margin-right: 10px;
        }
      }
      .text-container{
        display: flex;
        .cover{
          width: 60px;
          height: 60px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
        .text-area{
          margin-left: 20px;
          flex: 1;
          textarea{
            width: 100%;
            outline: none;
            background: #f8f9ff;
            resize: none;
            padding: 6px 12px;
            color: #666;
            border: 1px solid #eaebff;
            border-radius: 3px;
            font-size: 13px;
            height: 80px;
          }
        }
      }
      .submit{
        margin-top: 10px;
        .button{
          float: right;
          padding: 6px 16px;
          background-color: #FA2800;
          color: #F7F7F7;
          border-radius: 6px;
          cursor: pointer;
        }
      }
      .clearfix::before{
        content: "";
        display: block;
        clear: both;
      }
    }
    .comment-list{
      h2{
        margin: 20px 0;
      }
      ul{
        margin-top: 20px;
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
            flex: 1;
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
                i{
                  cursor: pointer;
                }
                .icon-active{
                  color: #FA2800;
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
            .comment-box{
            }
          }
        }
      }
    }
  }
</style>
