<template>
  <div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="false"
      infinite-scroll-disabled="isDisabled"
    >
      <li
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePag(data.filmId)"
      >
        <img :src="data.poster" alt />
        <h3>{{ data.name }}</h3>
        <p>主演: {{ data.actors | actorsmovies }}</p>
        <span>{{ data.nation }} | {{ data.runtime + "分钟" }}</span>
        <button>购票</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import "@/views/filters/actorsMovies.js";
export default {
  data() {
    return {
      datalist: [],
      isDisabled: false,
      current: 1,
      total: 0
    };
  },
  mounted() {
    // https://m.maizuo.com/gateway?cityId=420100&pageNum=2&pageSize=10&type=1&k=402423
    axios({
      url: `https://m.maizuo.com/gateway?cityId=420100&pageNum=${this.current}&pageSize=10&type=1&k=6841632`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      // console.log(res.data.data);
      this.datalist = res.data.data.films;
      this.total = res.data.data.total; //电影片源个数
    });
  },
  methods: {
    handleChangePag(id) {
      //编程式导航
      // console.log(id);
      // this.$router === route.js定义的路由对象，  是完整路由对象
      //动态路由 跳转 -1

      //跳转页面
      this.$router.push(`/detail/${id}`); // /detail/4588

      //动态路由 跳转 -2
      //this.$router.push({name:"detail",params:{kerwinid:id}});

      //get传参 跳转方式
      // this.$router.push(`/detail?id=${id}`)
    },
    loadMore() {
      this.current++;
      //当第一次底部请求数据时禁用无限滚动
      this.isDisabled = true;
      console.log("到底了");
      //判断请求完了的电影片数是否等于电影总片源数据 如果等于则不再请求禁用滚动加载 优化性能避免后端无数据前端页面一直请求
      if (this.datalist.length === this.total) {
        return;
      }

      axios({
        url: `https://m.maizuo.com/gateway?cityId=420100&pageNum=${this.current}&pageSize=10&type=1&k=6841632`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        console.log(res.data);
        // this.datalist = res.data.data.films;
        this.datalist = [...this.datalist, ...res.data.data.films];
        //请求完数据 解除无限滚动
        this.isDisabled = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  li {
    position: relative;
    overflow: hidden;
    padding: 15px;
    img {
      float: left;
      width: 70px;
      height: 100px;
    }
    h3 {
      font-weight: normal;
      margin-left: 22%;
      padding-top: 10px;
      color: #191a1b;
      font-size: 16px;
    }
    p {
      position: absolute;
      left: 24%;
      bottom: 50px;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #797d82;
    }
    span {
      position: absolute;
      left: 24%;
      bottom: 25px;
      font-size: 14px;
      color: #797d82;
    }
    button {
      position: absolute;
      right: 20px;
      bottom: 70px;
      line-height: 25px;
      height: 25px;
      width: 50px;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      border: 1px solid #ff5f16;
      color: #ff5f16;
      background: #fff;
    }
  }
}
</style>
