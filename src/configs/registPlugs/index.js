import Vue from 'vue';

import vuex from 'vuex';

import { AjaxPlugin, AlertPlugin, LoadingPlugin, ToastPlugin } from 'vux';

export default function () {
    Vue.use(vuex);

    // 添加alert组件
    Vue.use(AlertPlugin);

    // 添加Loading组件
    Vue.use(LoadingPlugin);

    // 添加http拦截
    Vue.use(AjaxPlugin);

    // 添加Toast组件
    Vue.use(ToastPlugin);
};
