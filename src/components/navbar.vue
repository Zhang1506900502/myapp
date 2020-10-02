<template>
  <div id="nav">
    <ul>
      <router-link to="/movies" tag="li" activeClass="active">
        <i class="iconfont icon-dianying"></i>
        <span>电影</span>
      </router-link>
      <router-link to="/cinema" tag="li" activeClass="active">
        <i class="iconfont icon-wode"></i>
        <span>影院</span>
      </router-link>
      <router-link to="/message" tag="li" activeClass="active">
        <i class="iconfont icon-yingyuan"></i>
        <span>资讯</span>
      </router-link>
      <router-link to="/personage" tag="li" activeClass="active">
        <i class="iconfont icon-zixun"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
// import Cinema from "@/views/film/cinema.vue";
// // import Message from "@/views/film/message.vue";
// // import Movies from "@/views/film/movies.vue";
// // import Persinage from "@/views/film/personage.vue";
// export default {
//   data() {},
//   methods: {
//     gotolink() {}
//   }
// };
</script>
<style lang="scss" scoped>
#nav {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background: white;
  color: black;
  z-index: 55;
  ul {
    display: flex;
    position: relative;
    li {
      position: relative;
      flex: 1;
      height: 50px;
      list-style: none;
      span {
        font-size: 12px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding-bottom: 10px;
      }
      .iconfont {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
.active {
  color: red;
}
</style>
