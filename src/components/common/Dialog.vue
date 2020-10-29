<template>
  <div class="cover">
    <div class="dialog" v-if="title">
      <i class="iconfont iconclear" @click="clearDialog"></i>
      <h1>{{title}}</h1>
      <!--解析html-->
      <p v-html="textValue">
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    props: {
      // 标题
      title: {
        type: String,
        default: ""
      },
      // 文本内容
      textValue: {
        type: String,
        default: ""
      }
    },
    methods: {
      // 关闭弹窗
      clearDialog() {
        this.$emit("clearDialog")
      }
    }
  }
</script>

<style scoped lang="less">
.cover{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(25, 25, 25, 0.78);
  z-index: 20000;
  .dialog{
    width: 400px;
    background-color: #fff;
    padding: 15px 20px 15px 15px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    i {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #FA2800;
      cursor: pointer;
    }
    h1 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 10px;
      color: #000;
    }
    p {
      font-size: 14px;
      line-height: 1.5em;
      color: #000;
      max-height: 400px;
      overflow: auto;
    }
  }
}
</style>
