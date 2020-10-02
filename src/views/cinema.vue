<template>
  <div>
    <div class="fixed">
      <header class="left">
        <div class="locationLeft" @click="handlelocation()">
          <span :value="passaddress">{{ passaddress }}</span>
          <img :src="imgUrl" alt="" class="locationImg" />
        </div>
        <div class="locationMiddel">影院</div>
        <div class="locationRight">
          <img :src="imgUrl2" alt="" />
        </div>
        <div class="cityLable">
          <div>
            全城
            <img :src="imgUrl" alt="" class="locationImg" />
          </div>
          <div>
            APP订票
            <img :src="imgUrl" alt="" class="locationImg" />
          </div>
          <div>
            最近去过
            <img :src="imgUrl" alt="" class="locationImg" />
          </div>
        </div>
      </header>
    </div>
    <div class="cinema_container" :style="{ height: cinemeheight }">
      <ul>
        <li v-for="data in datalist" :key="data.cinemaId">
          <div class="navr">
            <span class="cinema_name">{{ data.name }}</span>
            <p class="cinema_p">{{ data.address }}</p>
          </div>
          <div class="cinema_price">
            <div class="cinema_money">
              <span class="money_one">￥</span>
              <span>xx</span>
              <span>起</span>
            </div>
            <strong class="cinema_distance">距离未知</strong>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BetterScroll from "better-scroll";
import bus from "@/bus/Eventbus.js";
export default {
  data() {
    return {
      datalist: [],
      cinemeheight: 0,
      passaddress: "武汉",
      imgUrl: require("../assets/images/bottom.png"),
      imgUrl2: require("../assets/images/seek.png")
    };
  },
  methods: {
    handlelocation() {
      this.$router.push("/city");
      // console.log("1111");
    }
  },
  beforeMount() {
    bus.$on("passitem", data => {
      console.log(data);
      this.passaddress = data.toString();
    });
  },
  mounted() {
    // console.log(this.$refs.address);

    this.cinemeheight = document.documentElement.clientHeight - 50 + "px";
    // var cinema_container = document.getElementsByClassName('.cinema_container')
    axios({
      url: "https://m.maizuo.com/gateway?cityId=420100&ticketFlag=1&k=233677",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
        "X-Host": "mall.film-ticket.cinema.list"
      }
    }).then(res => {
      // console.log(res.data.data.cinemas);
      this.datalist = res.data.data.cinemas;
      this.$nextTick(() => {
        var myscroll = new BetterScroll(".cinema_container", {
          scrollbar: { scrollY: true, scrollbar: true },
          pullUpLoad: { threshold: 50 } //better-scroll 下拉加载参数
        });
        myscroll.on("pullingUp", () => {
          console.log("到底了");
          this.datalist.push({
            cinemaId: "32424325235",
            name: "请求中........"
          });
          myscroll.refresh(); //重新更新一下 refresh刷新页面
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.cinema_price {
  float: right;
  width: 70px;
  height: 45px;
  position: absolute;
  top: 12px;
  right: 0;
}
.navr {
  width: 280px;
  height: 45px;
  // overflow: hidden;
}
.cinema_name {
  font-size: 16px;
}
.cinema_p {
  font-size: 13px;
  // width: 290px;
  // height: 15px;
  overflow: hidden;
  color: #909398;
  margin-top: 5px;
}
// }
ul {
  li {
    width: 385px;
    height: 45px;
    position: relative;
    padding: 15px;
    .cinema_money {
      color: #ff5f16;
      span {
        font-weight: lighter;
      }
    }
    .cinema_distance {
      font-weight: lighter;
      font-size: 12px;
    }
  }
}

.locationImg {
  width: 10px;
  height: 10px;
}
.cinema_container {
  overflow: hidden;
  // padding-top: 100px;
}
.fixed {
  position: relative;
}
.left {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  background: #ffffff;
  color: #000;
  z-index: 10;
  .locationLeft {
    flex: 1.5;
    width: 60px;
    height: 42px;
    float: left;
    font-size: 14px;
    margin-left: 5px;
  }
  .locationMiddel {
    flex: 7;
    font-size: 18px;
    padding-bottom: 5px;
    // font-weight: normal;
  }
  .locationRight {
    flex: 1.5;
    float: right;
    img {
      width: 20px;
      height: 20px;
      margin-top: 10px;
    }
  }
  .cityLable {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    div {
      float: left;
      flex: 1;
      background: #fff;
    }
  }
}
</style>
