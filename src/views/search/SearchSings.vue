<template>
  <div class="search-sings">
    <singer-list :singers="searchData" :isShowSongCount="false"></singer-list>
  </div>
</template>

<script>
  import SingerList from "../../components/common/SingerList";
  export default {
    name: "SearchSings",
    props: {
      searchData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      SingerList
    }
  }
</script>

<style scoped>

</style>
