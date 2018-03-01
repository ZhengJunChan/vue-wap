/**
 * 项目入口文件
 * Created by 郑君婵 on 2017-05-24
 */
import Fingerprint2 from 'fingerprintjs2';

import Vue from 'vue';
import FastClick from 'fastclick';

import { CookieUtil } from '@/utils';
import register from '@/configs';

import App from './app.vue';
import router from '@/router';
import { HttpInterceptor } from '@/interceptors';

FastClick.attach(document.body);
CookieUtil.set('logAt', 4);
new Fingerprint2().get(result => {
    window.localStorage.setItem('fingerprint', result);
    register();

    HttpInterceptor(Vue);

    Vue.config.productionTip = false;

    /* 项目启动 */
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app-box');
});
