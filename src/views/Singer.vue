<template>
  <div class="singer">
    <div v-if="!isLoading">
      <category-container :category="singerCategory" @switchTag="switchTag" :activeIndex="activeIndex"></category-container>
      <singer-list :singers="singers"></singer-list>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import CategoryContainer from "../components/common/CategoryContainer";
  import SingerList from "../components/common/SingerList";
  import Loading from "../components/common/Loading"

  export default {
    name: "Singer",
    components: {
      SingerList,
      CategoryContainer,
      Loading
    },
    data() {
      return {
        singerParams: {
          limit: 40,
          offset: 0,
          type: -1,
          area: -1,
          initial: -1,
        },
        singers: [],
        singerCategory: {
          type: [
            { value: -1, label: '全部' },
            { value: 1, label: '男歌手' },
            { value: 2, label: '女歌手' },
            { value: 3, label: '乐队' }
          ],
          area: [
            { value: -1, label: "全部" },
            { value: 7, label: '华语' },
            { value: 96, label: '欧美' },
            { value: 8, label: '日本' },
            { value: 16, label: '韩国' },
            { value: 0, label: '其他' }
          ],
          initial: [
            { value: -1, label: "热门" },
            { value: "a", label: "A" },
            { value: "b", label: "B" },
            { value: "c", label: "C" },
            { value: "d", label: "D" },
            { value: "e", label: "E" },
            { value: "f", label: "F" },
            { value: "h", label: "H" },
            { value: "i", label: "I" },
            { value: "g", label: "G" },
            { value: "k", label: "K" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
            { value: "n", label: "N" },
            { value: "o", label: "O" },
            { value: "p", label: "P" },
            { value: "q", label: "Q" },
            { value: "r", label: "R" },
            { value: "s", label: "S" },
            { value: "t", label: "T" },
            { value: "u", label: "U" },
            { value: "v", label: "V" },
            { value: "w", label: "W" },
            { value: "x", label: "X" },
            { value: "y", label: "Y" },
            { value: "z", label: "Z" },
            { value: 0, label: "其他" },
          ],
        },
        activeIndex: {
          type: 0,
          area: 0,
          initial: 0
        },
        isLoading: true
      }
    },
    methods: {
      switchTag(index, key) {
        console.log(index, key)
        this.activeIndex[key] = index
        // 请求数据
        this.singerParams[key] = this.singerCategory[key][index].value
        console.log(this.singerParams)
        this._getSingerCategory()
      },
      async _getSingerCategory() {
        try {
          let res = await this.$api.getSingerCategory(this.singerParams)
          if (res.status === 200 && res.statusText === "OK") {
            this.singers = res.data.artists
            this.isLoading = false
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      this._getSingerCategory()
    }
  }
</script>

<style scoped lang="less">
.singer{
  min-width: 1230px;
  padding-top: 85px;
  padding-bottom: 30px;
}
</style>
