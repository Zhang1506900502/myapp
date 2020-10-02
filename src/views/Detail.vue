<template>
  <div v-if="datainfo">
    <div class="poster_nav">
      <div class="iconfont_nav">
        <div class="title" v-show="isShow">
          {{ datainfo.name }}
        </div>
        <!-- <div class="iconfont_big"> -->
        <span class="iconfont icon-youjiantou" @click="handlePge()"></span>
        <!-- </div> -->
      </div>
      <img :src="datainfo.poster" class="poster" />
    </div>

    <div class="movies_detail">
      <div class="movies_detail1">{{ datainfo.name }}</div>
      <div class="movies_detail2">{{ datainfo.category }}</div>
      <div class="movies_detail3">
        {{ datainfo.nation }} | {{ datainfo.runtime + "分钟" }}
      </div>
      <div class="movies_detail4">{{ datainfo.synopsis }}</div>
    </div>
    <div class="actors_nav">
      <h4>演职人员</h4>
      <swiper class="actors" perview="4" myclass="actors">
        <div
          class="swiper-slide"
          v-for="(data, index) in datainfo.actors"
          :key="index"
        >
          <img :src="data.avatarAddress" />
          <span>{{ data.name }}</span>
          <span>{{ data.role }}</span>
        </div>
      </swiper>
    </div>

    <div class="actors_photos">
      <h4 class="photos_text">剧照</h4>
      <swiper class="photos" perview="2" myclass="photos">
        <div
          class="swiper-slide"
          v-for="(data, index) in datainfo.photos"
          :key="index"
        >
          <img :src="data" />
        </div>
      </swiper>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swiper from "@/views/detail/swiper.vue";
// import bus from "@/bus/Eventbus.js";
export default {
  data() {
    return {
      datainfo: null,
      isShow: false
    };
  },
  methods: {
    handlePge() {
      this.$router.push("/movies/nowplaying"); //跳转页面
    },
    handleScroll() {
      // 全局监听页面滚动;
      var scrollT = document.documentElement.scrollTop;
      // console.log(scrollT);
      if (scrollT >= 50) {
        // this.$store.commit("isShow", 1);
        this.isShow = true;
      } else {
        // this.$store.commit("isShow", -1);
        this.isShow = false;
      }
    }
  },
  mounted() {
    // $router 是当前路由对象
    // console.log(this.$route.params.id);

    //隐藏底部选项框
    //bus 事件总线，已经封装成全局可用 bus/Eventbus.js  $emit(向 bus事件总线传参) app.vue中已经有bus总线监听接受参数了
    // bus.$emit("kwrwin", false);
    window.addEventListener("scroll", this.handleScroll);
    //用vuex 状态管理来操作底部选项框
    // this.$store.state.isTabbarShow = false; 实际不可使用  需遵循vux的流程
    this.$store.commit("HideTabbarMutation", false);
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=6445881`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then(res => {
      console.log(res.data);
      this.datainfo = res.data.data.film;
    });
  },
  components: {
    swiper
  },
  beforeDestroy() {
    //显示底部选项卡
    // bus.$emit("kwrwin", true);

    // this.$store.state.isTabbarShow = true; 实际不可使用  需遵循vux的流程
    this.$store.commit("ShowTabbarMutation", true);
  }
};
</script>
<style lang="scss" scoped>
.poster_nav {
  position: relative;
  overflow: hidden;
  height: 230px;
  // z-index: 6;
  .iconfont {
    font-size: 25px;
    left: -2px;
    width: 30px;
    height: 30px;
    position: fixed;
    top: 5px;
    left: 5px;
    line-height: 30px;
    border-radius: 30px;
    background: #ffffff;
    text-align: center;
  }
  .title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // height: 40px;
    text-align: center;
    background: #ffffff;
    line-height: 40px;
    font-size: 18px;
  }
}

.poster {
  width: 100%;
}
.movies_detail {
  padding: 12px 15px 15px 15px;
  height: 150px;
  border-bottom: 10px solid #e6e6e6;
  .movies_detail1 {
    color: #191a1b;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
  }
  div {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
    padding-top: 5px;
  }
  .movies_detail4 {
    width: 385px;
    height: 35px;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.actors_nav {
  border-bottom: 10px solid #ececec;
  .actors {
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
    img {
      width: 80px;
      height: 110px;
      overflow: hidden;
    }
    span {
      padding-top: 5px;
      font-size: 12px;
      color: #191a1b;
      display: block;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  h4 {
    font-weight: normal;
    padding: 15px;
  }
}

.photos_text {
  height: 43px;
  line-height: 43px;
  padding-left: 15px;
  font-weight: normal;
}
.photos {
  height: 180px;

  a {
    float: right;
  }
  img {
    width: 100%;
  }
}
</style>
