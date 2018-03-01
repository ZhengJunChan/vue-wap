/*  获取token Created by 郑君婵 on 2017-05-25  */

import store from '@/vuex';
import { TokenUtil, BrowserUtil, RouterUtil } from '@/utils';

function setTiTle(to, from, next) {
    let appParams = {
        funcName: 'setTitle',
        params: {
            title: to.meta.title,
            headerType: 'share'
        }
    };

    if (BrowserUtil.isFromIosApp()) {
        window.callAppFunction(appParams);
    } else if (BrowserUtil.isFromAndroidApp()) {
        window.android.funtionAndroid(JSON.stringify(appParams));
    } else if (to.meta.title) {
        document.title = to.meta.title;
    }
}

function setRouter(to, from, next) {
    var token = window.localStorage.getItem('token');
    if (token) {
        next();
    } else {
        TokenUtil.save('', function (token) {
            next();
        });
    }
}

export default function (router, vue) {
    router.beforeEach((to, from, next) => {
        // 设置loading
        store.commit('updateLoadingStatus', { isLoading: true });

        // 设置title
        setTiTle(to);
        setRouter(to, from, next);

        // 存储上一页url
        RouterUtil.setPreviousLoginPage(from.fullPath);
        vue.prototype.$share();
    });

    router.afterEach(function (to) {
        if (!to.meta.stopToTop) {
            window.scrollTo(0, 0);
        }

        store.commit('initPlayer');
        store.commit('updateLoadingStatus', { isLoading: false });
    });
};
