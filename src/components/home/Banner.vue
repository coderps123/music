<template>
  <div class="banner">
    <swiper :options="swiperOption" v-if="bannersInit">　　　　
      <swiper-slide v-for="banner in banners" :key="banner.imageUrl">
        <img v-lazy="banner.imageUrl"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "Banner",
    data() {
      return {
        banners: [],
        swiperOption: {
          autoplay: 3000,  // 轮播间隔时间
          loop: true,　　// 是否自动轮播
          pagination: '.swiper-pagination', //轮播图中下标点显示
          paginationClickable: true,　　 //轮播图中下标点显示,
          slidesPerView: 3, // 显示几张图片
          spaceBetween: 30, // 图片左右间距
          slidesPerGroup: 3, // 一次拖动几个
          loopFillGroupWithBlank: true,
          centeredSlides: true,
          grabCursor: true,
        }
      }
    },
    computed: {
      bannersInit() {
        return this.banners.length > 0
      }
    },
    created() {
      this._getBanner()
    },
    methods: {
      async _getBanner() {
        try {
          let res = await this.$api.getBanner()
          if (res.status === 200 && res.statusText === "OK") {
            this.banners = res.data.banners
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  }
</script>

<style scoped lang="less">
.banner{
  .swiper-container{
    width: 100%;
    padding: 20px 0 30px;
    .swiper-wrapper{
      .swiper-slide{
        img{
          height: 136.5px;
          border-radius: 3px;
        }
      }
    }
    .swiper-pagination-bullets /deep/ .swiper-pagination-bullet{
      width: 6px;
      height: 6px;
      margin: 0 6px;
     }
    .swiper-pagination-bullets /deep/ .swiper-pagination-bullet-active{
      width: 15px;
      height: 6px;
      border-radius: 50px;
      background-color: red;
    }
  }
}
</style>
