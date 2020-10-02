<template>
  <div id="app">
    <!-- 第一种写法 -->
    <!-- <Navbar v-show="$store.state.isTabbarShow"></Navbar> -->
    <!-- 第二种写法 -->
    <Navbar v-show="isTabbarShow"></Navbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Navbar from "@/components/navbar.vue";
import { mapState } from "vuex";
// import obj from"@/module/moduleA.js"; //es6导入---1  全部导出
// import { mapState, mapFilter } from "@/module/moduleB.js"; //es6导入---2 可以只导入几个接口

// console.log("11111", mapState, mapFilter);
// import bus from "@/bus/Eventbus.js";
export default {
  data() {
    return {
      // isShow: true
    };
  },
  // beforeMount() {
  //   // 监听事件
  //   bus.$on("kwrwin", data => {
  //     console.log("1111");
  //     this.isShow = data;
  //   });
  // },

  components: {
    Navbar
  },
  //计算属性第一种写法
  // computed: {
  //   computedShow() {
  //     return this.$store.state.isTabbarShow;
  //   }
  // }

  //计算属性第二种写法
  // computed: mapState(["isTabbarShow"]) //一般不会使用此种方法 页面如果有自己的计算属性很难操作 不建议
  // computed: mapState(["isTabbarShow"]) ===  {istabbarShow(){ return false}}

  //计算属性第三种写法
  computed: {
    ...mapState(["isTabbarShow"])
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  /* touch-action: none; */
  /* touch-action: none;禁用所有手势 */
}

ul,
li {
  list-style: none;
}

section {
  margin-bottom: 50px;
}
</style>
