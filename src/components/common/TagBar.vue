<template>
  <div class="tag-bar">
    <div class="category-container">
      <div class="main-click" @click="showMask">
        <span class='main-tag'>
          {{mainTag}}
        </span>
        <i class="iconfont iconjiantouyou" v-show="!isShowMask"></i>
        <i class="iconfont iconjiantouxia" v-show="isShowMask"></i>
      </div>
      <div class="hot-tags">热门标签:</div>
      <ul>
        <li v-for="(tag, index) in hotTags" :key="tag.id" :class="{'link-active': (index == currentIndex)}">
          <a href="javascript:;" :data-index="index" @click="switchHotTags($event.target.dataset.index, tag)">{{tag.name}}</a>
        </li>
      </ul>
      <div class="hot" v-if="videoPage">
        <span @click="chooseType('hot')" :class="{'hot-active': songSheetParams.order === 'hot'}" >热门</span>
        <span @click="chooseType('new')" :class="{'hot-active': songSheetParams.order === 'new'}" >最新</span>
      </div>
      <div class="video-all" v-else>
        <span @click="loadALlVideo" :class="{'active': mainTag === '全部'}">全部</span>
      </div>
    </div>
    <!--弹窗区域-->
    <transition name="fade">
      <div class="mask" v-show="isShowMask" @click="showMask">
        <div class="group" v-for="group in categoryType" :key="group.key">
          <div v-if="videoPage">
            <h2>
              <a href="javascript:;">
                <i :class="group.icon"></i>
                <span>{{group.value}}</span>
              </a>
            </h2>
            <ul class="clearfix">
              <li v-for="tag in group.tags" @click="transitionClick(tag.name)">
                <a href="#">{{tag.name}}</a>
              </li>
            </ul>
          </div>
          <div v-else class="video-item" @click="tagClick(group)">
            {{group.name}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "TagBar",
    props: {
      hotTags: {
        type: Array,
        default() {
          return []
        }
      },
      songSheetParams: {
        type: Object,
        default() {
          return {}
        }
      },
      mainTag: {
        type: String,
        default: "全部"
      },
      categoryType: {
        type: Array,
        default() {
          return []
        }
      },
      videoPage: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentIndex: -1,
        isShowMask: false,
      }
    },
    methods: {
      // 点击右侧按钮加载全部视频
      loadALlVideo() {
        this.$emit("loadingVideo")
      },
      // 弹窗区域列表点击事件
      tagClick(group) {
        this.$emit("tagClick", group)
        this.currentIndex = -1
      },
      // 显示弹窗
      showMask() {
        this.isShowMask = !this.isShowMask
      },
      // 弹窗列表item项点击事件
      transitionClick(tagName) {
        this.$emit("transitionClick", tagName)
        this.currentIndex = -1
      },
      // 切换热门标签
      switchHotTags(index, tag) {
        this.currentIndex = index
        this.$emit("switchHotTags", tag)
      },
      chooseType(type) {
        this.$emit("chooseType", type)
      }
    }
  }
</script>

<style scoped lang="less">
  .category-container{
    display: flex;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
    margin: 0 20px 20px;
    .main-click{
      padding: 11px 15px;
      background-color: #FA2800;
      border-radius: 5px 0 0 5px;
      color: #fff;
      cursor: pointer;
      i{
        margin-left: 10px;
      }
    }
    .hot-tags{
      padding: 0 15px;
      display: flex;
      align-items: center;
    }
    ul{
      flex: 1;
      li{
        float: left;
        margin-right: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        a:hover{
          color: #FA2800;
        }
      }
    }
    .hot{
      display: flex;
      align-items: center;
      span{
        padding: 6px 10px;
        background-color: #F7F7F7;
        margin-right: 20px;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
        cursor: pointer;
      }
      .hot-active{
        background-color: #FA2800;
        color: #fff;
      }
    }
    .video-all{
      display: flex;
      align-items: center;
      span{
        padding: 6px 10px;
        background-color: #F7F7F7;
        margin-right: 20px;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
        cursor: pointer;
      }
      .active{
        background-color: #FA2800;
        color: #F7F7F7;
      }
    }
  }
  .mask{
    width: 720px;
    height: 370px;
    margin: -12px 0 0 15px;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
    border-radius: 4px;
    position: absolute;
    z-index: 10;
    overflow: auto;
    padding-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    .group{
      h2{
        padding: 26px 0 8px 20px;
        i{
          margin-right: 6px;
        }
      }
      ul{
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;
        li{
          padding: 8px 15px;
          border-radius: 50px;
          margin: 8px 0 0 10px;
          color: #161e27;
          font-size: 12px;
          background-color: #F7F7F7;
        }
        li:hover{
          background-color: #FA2800;
          a{
            color: #fff;
          }
        }
      }
      .video-item{
        padding: 8px 15px;
        border-radius: 50px;
        margin: 8px 0 0 10px;
        color: #161e27;
        font-size: 12px;
        background-color: #F7F7F7;
        cursor: pointer;
        &:hover{
          background-color: #FA2800;
          color: #F7F7F7;
        }
      }

    }
  }
  .link-active a{
    color: #FA2800;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;

  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translate(0, 30px);
  }
</style>
