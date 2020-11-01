<template>
  <div class="search-album">
    <album-list :albums="searchData"></album-list>
  </div>
</template>

<script>
  import AlbumList from "../../components/common/AlbumList";
  export default {
    name: "SearchAlbum",
    props: {
      searchData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      AlbumList
    }
  }
</script>

<style scoped>

</style>
