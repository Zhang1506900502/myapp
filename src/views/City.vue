<template>
  <div>
    <div class="sectionHeader">
      <span>
        <div class="icon" @click="handleCity()">
          <img :src="imgUrl" alt="" />
        </div>
        <div class="icon_city">当前城市-</div>
      </span>
    </div>
    <mt-index-list :style="{ height: iscityHeight }">
      <mt-index-section
        :index="data.index"
        v-for="data in datalist"
        :key="data.index"
      >
        <mt-cell
          :title="item.name"
          v-for="item in data.city"
          :key="item.cityId"
          @click.native="handlePge($event)"
        >
        </mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
import axios from "axios";
import bus from "@/bus/Eventbus.js";
export default {
  data() {
    return {
      iscityHeight: 0,
      datalist: [],
      imgUrl: require("../assets/images/unplice.png")
    };
  },
  mounted() {
    this.iscityHeight = document.documentElement.clientHeight - 50 + "px";

    axios({
      url: "https://m.maizuo.com/gateway?k=4381743",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
        "X-Host": "mall.film-ticket.city.list"
      }
    }).then(res => {
      //   console.log(res.data);
      this.datalist = this.handleCityArr(res.data.data.cities);
    });
  },
  methods: {
    handleCityArr(list) {
      var arr = [];
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i)); //fromCharCode 把数字编译成字母
      }
      //   console.log(arr);

      var newlist = [];
      for (let i = 0; i < arr.length; i++) {
        var newarr = list.filter(
          item => item.pinyin.substring(0, 1) === arr[i].toLowerCase()
        );
        //toLowerCase 转为小写的字符串
        // console.log(arr);
        if (!(newarr.length === 0)) {
          newlist.push({
            index: arr[i],
            city: newarr
          });
        }
      }
      // console.log(newlist);
      return newlist;
    },
    handleCity() {
      this.$router.push("/cinema");
    },
    handlePge(e) {
      // console.log(e.target);
      // console.log(e.target.innerText);
      //此处涉及到一处知识点
      //innerText与textContent 方法类似
      // textContent方法返回文本节点带空格一起  innerText不会返回带空格字符串
      var citytext = e.target.innerText;
      bus.$emit("passitem", citytext);
      this.$router.push("/cinema");
    }
  }
};
</script>

<style lang="scss" scoped>
.sectionHeader {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  .icon {
    float: left;
    img {
      width: 15px;
      height: 15px;
      padding-left: 10px;
    }
  }
  .icon_city {
    float: left;
    font-size: 20px;
    margin-left: 35%;
  }
}
</style>