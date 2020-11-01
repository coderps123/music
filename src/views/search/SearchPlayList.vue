<template>
  <div class="search-play-list">
    <song-sheet-list :songSheetList="searchData"></song-sheet-list>
  </div>
</template>

<script>
  import SongSheetList from "../../components/common/SongSheetList";
  export default {
    name: "SearchPlayList",
    props: {
      searchData: {
        type: Array,
        default() {
          return []
        }
      },
    },
    components: {
      SongSheetList
    }
  }
</script>

<style scoped>

</style>
