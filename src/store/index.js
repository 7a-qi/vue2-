import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import Cookie from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    tabList: [
      {
        path: "/",
        name: "home",
        labael: "首页",
      }
    ],
    record: null,
    menu:[]
  },
  getters: {
  },
  mutations: {
    collapse(state) {
      this.state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, payload) {
      if (payload.name !== 'home') {
        state.record = payload
        const result = state.tabList.findIndex(t => t.name === payload.name);
        if (result === -1) {
          state.tabList.push(payload)
        }
      } else {
        state.record = null;
      }
    },
    setMenu(state,value) {
      console.log(value);
      state.menu = value;
      Cookie.set('menu',JSON.stringify(value))
    },
    clearMenu(state){
      state.menu = [];
      Cookie.remove('menu');
    },
    getMenu(state, router){
      if(!Cookie.get('menu')){
        return
      }
      const menu = JSON.parse(Cookie.get('menu'));
      state.menu = menu;
      const menuArray = [];
      menu.forEach(item => {
        if (item.children){
          item.children - item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      });  
      menuArray.forEach(item => {
        router.addRoute('main',item)
      })
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
