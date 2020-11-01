<template>
  <div class="mv">
    <div v-if="!isLoading">
      <category-container
        :category="mvCategory"
        :activeIndex="activeIndex"
        @switchTag="switchTag"/>
      <video-list :videoList="mvList"></video-list>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import CategoryContainer from "../components/common/CategoryContainer";
  import VideoList from "../components/common/VideoList";
  import Loading from "../components/common/Loading"
  export default {
    name: "MV",
    components: {
      CategoryContainer,
      VideoList,
      Loading
    },
    data() {
      return {
        mvList: [],
        mvParamas: {
          area: "全部",
          type: "全部",
          order: "上升最快",
          limit: 20,
          offset: 0
        },
        mvCategory: {
          area: [
            { value: "全部" },
            { value: "内地" },
            { value: "港台" },
            { value: "欧美" },
            { value: "日本" },
            { value: "韩国" }
          ],
          type: [
            { value: "全部" },
            { value: "官方版" },
            { value: "原生" },
            { value: "现场版" },
            { value: "网易出品" }
          ],
          order: [
            { value: "上升最快" },
            { value: "最热" },
            { value: "最新" }
          ]
        },
        activeIndex: {
          area: 0,
          type: 0,
          order: 0
        },
        isLoading: true
      }
    },
    methods: {
      // 切换 tag
      switchTag(index, key) {
        this.activeIndex[key] = index
        this.mvParamas[key] = this.mvCategory[key][index].value
        // 请求数据
        this._getAllMV()
      },
      // 获取全部 mv
      async _getAllMV() {
        try {
          let res = await this.$api.getAllMV(this.mvParamas)
          if (res.status === 200 && res.statusText === "OK") {
            this.mvList = res.data.data
            this.isLoading = false
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      // 获取全部 mv
      this._getAllMV()
    }
  }
</script>

<style scoped lang="less">
.mv{
  min-width: 1230px;
  padding-top: 85px;
  padding-bottom: 30px;
}
</style>
