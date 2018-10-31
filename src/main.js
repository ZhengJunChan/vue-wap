/**
 * 项目入口文件
 * Created by 郑君婵 on 2017-05-24
 */
import 'babel-polyfill';
import AndroidApp from '@/utils/android-app.js';
import Fingerprint2 from 'fingerprintjs2';

import Vue from 'vue';
import FastClick from 'fastclick';

import { CookieUtil } from '@/utils';
import register from '@/configs';

import App from './app.vue';
import router from '@/router';
import { HttpInterceptor } from '@/interceptors';

import store from '@/vuex';

FastClick.attach(document.body);
CookieUtil.set('from', 'wap');

AndroidApp.init();

new Fingerprint2({userDefinedFonts: ['yyt'], excludeJsFonts: true}).get(result => {
    register();

    store.commit('setDeviceToken', result);

    HttpInterceptor(Vue);

    Vue.config.productionTip = false;

    /* 项目启动 */
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app-box');
});

/* 冯总要求加的这段代码，也不知道为啥，反正就是要加上 */
(function () {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];

    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(bp, s);
})();
/* / 冯总要求加的这段代码，也不知道为啥，反正就是要加上 */
