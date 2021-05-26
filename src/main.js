/*
 * @Author: zhuyue
 * @Date: 2020-12-29 14:24:19
 * @LastEditors: zhuyue
 * @LastEditTime: 2021-01-04 12:57:47
 * @Description: description
 */

import Vue from 'vue';
import App from './App';
// import store from './store' 
import store from './store'
Vue.prototype.$store = store

// #ifdef MP-WEIXIN
import uma from 'umtrack-wx';
uma.init({
    appKey: '6049922bb8c8d45c1395b20f',
    useOpenid: true,
    autoGetOpenid: true,
    debug: false
});
// #endif
new Vue({ store, ...App }).$mount();
