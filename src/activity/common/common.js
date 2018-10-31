import { BrowserUtil } from '@/utils';
import ApiUtil from '@/utils/api-util.js';
import CommonApi from './../activity-api.js';

export default {
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    acceptPrize(id, params) {
        if (params) {
            return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`, params);
        } else {
            return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`);
        }
    },
    /**
     * [acceptPrize 收下奖品]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    showShareWindow(vue, infos, successCallback) {
        CommonApi.shareItem(infos.alias, {wid: infos.id});

        if (!BrowserUtil.isFormApp()) {
            vue.$store.dispatch('showAlert', { type: 'share-tip' });
            return;
        }

        vue.callAppFunction('showShareWindow', infos);

        successCallback && successCallback();
    }
};
