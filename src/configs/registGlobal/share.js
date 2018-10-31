import store from '@/vuex';
import { BrowserUtil } from '@/utils';
import callAppFunction from './callAppFunction.js';

export default function (infos) {
    if (infos && infos.link) {
        infos.link = getRandomToLink(infos.link);
    }

    if (BrowserUtil.isFormApp()) {
        if (infos) {
            callAppFunction('share', infos);
        }

        return;
    }

    store.commit('setShareInfo', infos);

    if (BrowserUtil.isFormWeiXin()) {
        store.dispatch('registerWxSdk');
    }
};

function getRandomToLink(link) {
    let key = 'yytRandom';
    let random = Math.ceil(Math.random() * 100);

    if (link.indexOf(key) >= 0) {
        return;
    }

    link += (link.indexOf('?') < 0 ? '?' : '&') + key + random;

    return link;
}
