<template>
  <div class="swiper-container kerwin" :key="temps.lenght">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in temps" :key="index">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import con1 from "@/assets/images/img1.png";
import con2 from "@/assets/images/img2.jpg";
import con3 from "@/assets/images/img3.jpg";
import con4 from "@/assets/images/img4.jpg";
import con6 from "@/assets/images/img6.jpg";
import con7 from "@/assets/images/img7.jpg";
export default {
  data() {
    return {
      temps: [
        {
          imgUrl: con1
        },
        {
          imgUrl: con2
        },
        {
          imgUrl: con3
        },
        {
          imgUrl: con4
        },
        {
          imgUrl: con6
        },
        {
          imgUrl: con7
        }
      ]
    };
  },
  mounted() {
    new Swiper(".kerwin", {
      loop: true, // 循环模式选项
      //自动轮播
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>
<style lang="scss" scoped>
// .swiper-container {
//   width: 500px;
//   height: 300px;
// }
.swiper-wrapper {
  img {
    width: 100%;
  }
}
</style>
