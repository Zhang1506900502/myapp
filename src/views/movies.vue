<template>
  <div>
    <swiper ref="filmSwiper">
      <!-- <div class="swiper-slide" v-for="(item,index) in temps" :key="index">
        <img :src="item.imgUrl" />
      </div>-->
    </swiper>
    <Filmheader :class="isfixed ? 'fixed' : ''"></Filmheader>
    <!-- 二级路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import Filmheader from "@/views/film/filmheader.vue";
import swiper from "@/views/film/moviesswiper.vue";
import { Indicator } from "mint-ui";
import axios from "axios";

export default {
  data() {
    return {
      isfixed: false
    };
  },
  components: {
    Filmheader,
    swiper
  },
  mounted() {
    //开启loading框
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    axios({
      url:
        "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=1384809",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"154277371928424093566579"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      console.log(res.data);

      //请求数据完关闭loading框
      Indicator.close();
    });
    // }).then(res => {
    //   console.log(res.data);
    //   // this.datalist = res.data.data.films;
    // });
    window.onscroll = this.handleScroll;
  },
  methods: {
    handleScroll() {
      // conosle.log(this.$refs.filmSwiper.$el.offsetHeight) 拿到该组件对应原生dom节点  高度
      if (
        document.documentElement.scrollTop >=
        this.$refs.filmSwiper.$el.offsetHeight
        //ref被用来给元素或者组件来注册引用信息，引用信息将会注册在父组件的$refs对象上
        //如果用来普通dom元素上，指向的就是dom元素，如果用在子组件上指向的就是组件
        //实际上ref，refs就是用来操作获取dom元素的
      ) {
        // console.log("flex");
        this.isfixed = true;
      } else {
        // console.log("unflex");
        this.isfixed = false;
      }
    }
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
<style lang="scss" scoped></style>
