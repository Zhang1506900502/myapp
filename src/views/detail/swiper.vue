<template>
  <div class="swiper-container">
    <!-- {{myclass}} -->
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/javascript">
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  props: ["perview", "myclass"],

  mounted() {
    console.log("mounted");
    new Swiper("." + this.myclass, {
      // direction: 'vertical',
      slidesPerView: this.perview, //根据需求动态展示多个slide
      spaceBetween: 10,
      freeMode: true
    });
  }
};
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
</style>
