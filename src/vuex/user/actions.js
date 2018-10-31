import { UserApi } from '@/api';
import { BrowserUtil, CookieUtil } from '@/utils';

export default {
    /**
     * [requireUserInfos 获取用户信息]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     * @param    {[function]}   successCallback [成功以后的回调]
     */
    requireUserInfos({ dispatch, commit, state }) {
        if (state.isLogined) {
            return;
        }

        UserApi.getUserInfos().then(res => {
            dispatch('setUserInfo', res.data);
        });
    },
    login({ dispatch, commit, state }, {vue, options}) {
        if (BrowserUtil.isFormApp()) {
            let params = { funcName: 'gotoLogin' };

            if (this.options && this.options.reg_from) {
                params.reg_from = this.options.reg_from;
            }

            vue.callAppFunction('gotoLogin', params);
            return;
        }

        if (BrowserUtil.isFormWeiXin()) {
            dispatch('wxLogin', options);
            return;
        }

        // commit('bindMobile', successCallback);
        dispatch('showAlert', {
            type: 'login',
            options
        });
    },
    /**
     * [logout 退出]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    logout({ dispatch, commit, state }) {
        state.isLogined && UserApi.logout().then(res => {
            dispatch('setUserInfo', {});
        });
    },
    setUserInfo({ dispatch, commit, state }, infos) {
        state.isLogined = Object.keys(infos).length;

        if (state.isLogined) {
            Object.assign(state.infos, infos);
        } else {
            commit('resetUserInfos');
        }

        BrowserUtil.storage.setItem('uid', state.infos.id);

        if (!BrowserUtil.isFormApp()) {
            saveLogintoken(infos.logintoken || '');
        }
    }
};

function saveLogintoken(logintoken) {
    BrowserUtil.storage.setItem('logintoken', logintoken);

    if (BrowserUtil.isFormWeiXin()) {
        CookieUtil.set('logintoken', logintoken, getHalfYear());
    }
}

function getHalfYear() {
    // 先获取当前时间
    var curDate = (new Date()).getTime();
    // 将半年的时间单位换算成毫秒
    var halfYear = 365 / 2 * 24 * 3600 * 1000;
    var pastResult = curDate + halfYear;
 
    return new Date(pastResult);
}
