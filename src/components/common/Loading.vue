<template>
  <div class="container">
    <div class="loading"></div>
  </div>
</template>

<script>

</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
  }

  .loading {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 5px #ffffff solid;
    border-right-color: rgba(194, 187, 184, 0.57);
    animation: loading 1s linear infinite;
    margin: 100px auto;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
