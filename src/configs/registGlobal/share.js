import store from '@/vuex';
import { BrowserUtil } from '@/utils';
import callAppFunction from './callAppFunction.js';

export default function (infos) {
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
