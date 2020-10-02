<template>
  <div>
    <ul>
      <li
        v-for="data in $store.state.comingsoonlist"
        :key="data.filmId"
        @click="handleChangePag(data.filmId)"
      >
        <img :src="data.poster" alt />
        <h3>{{ data.name }}</h3>
        <p>主演: {{ data.actors | actorsmovies }}</p>
        <span>{{ data.nation }} | {{ data.runtime + "分钟" }}</span>
        <button>预售</button>
      </li>
    </ul>
  </div>
</template>

<script>
import "@/views/filters/actorsMovies.js";
export default {
  mounted() {
    if (this.$store.state.comingsoonlist.length === 0) {
      //数据请求，存储store
      //ajax
      this.$store.dispatch("GetComingSoonAction", "传去参数");
    } else {
      console.log("使用缓存数据", this.$store.state.comingsoonlist);
    }
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
      border: 1px solid #ffb232;
      color: #ffb232;
      background: #fff;
    }
  }
}
</style>

