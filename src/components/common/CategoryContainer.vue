<template>
  <div class="category-container">
    <ul v-for="(group, key) in category">
      <li v-for="(item, index) in group"
          :class="{'active': (index === activeIndex[key])}"
          @click="switchTag(index, key)">
        {{item.label || item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "CategoryContainer",
    props: {
      category: {
        type: Object,
        default() {
          return {}
        }
      },
      activeIndex: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      switchTag(index, key) {
        this.$emit('switchTag', index, key)
      }
    }
  }
</script>

<style scoped lang="less">
  .category-container{
    ul{
      display: flex;
      li{
        padding: 6px 12px;
        background-color: #f4f4f4;
        border-radius: 50px;
        margin: 10px 4px;
        cursor: pointer;
        font-size: 12px;
      }
      .active{
        background-color: #FA2800;
        color: #fff;
      }
    }
  }
</style>
