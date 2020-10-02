import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
//挂载Vuex
Vue.use(Vuex);
//创建VueX对象
const store = new Vuex.Store({
  state: {
    //共享状态
    isTabbarShow: true,
    comingsoonlist: [],
  },
  mutations: {
    HideTabbarMutation(state, payload) {
      //控制隐藏  
      state.isTabbarShow = payload;
    },
    ShowTabbarMutation(state, payload) {
      //控制显示
      state.isTabbarShow = payload;
    },

    GetComingSoonMutation(state, payload) {
      state.comingsoonlist = payload
    }
  },
  actions: {
    GetComingSoonAction(store) {
      //发送ajax请求
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=420100&pageNum=1&pageSize=10&type=2&k=2196327',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600577521153811368804354","bc":"420100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(res.data);
        //提交给mutation操作状态
        store.commit('GetComingSoonMutation', res.data.data.films);
      })
    }
  }
});

export default store;
