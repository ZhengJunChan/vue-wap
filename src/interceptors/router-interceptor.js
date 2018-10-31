/*  获取token Created by 郑君婵 on 2017-05-25  */

import store from '@/vuex';
import { RouterUtil } from '@/utils';

export default function (router, vue) {
    router.beforeEach((to, from, next) => {
        // 设置loading
        store.commit('updateLoadingStatus', { isLoading: true });

        // 设置title
        store.commit('setTitle', to.meta.title || '源音塘·音乐不止一种');

        // 存储上一页url
        RouterUtil.setPreviousLoginPage(from.fullPath);
        vue.prototype.$share();
        next();
    });

    router.afterEach(function (to) {
        if (!to.meta.stopToTop) {
            window.scrollTo(0, 0);
        }

        store.commit('initPlayer');
        store.commit('updateLoadingStatus', { isLoading: false });
    });
};
