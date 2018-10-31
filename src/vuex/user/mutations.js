import { BrowserUtil } from '@/utils';

export default {
    /**
     * [bindMobile 显示绑定手机号弹窗]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    bindMobile(state, successCallback) {
        state.loginAlert.isOpen = true;
        state.loginAlert.successCallback = () => {
            if (successCallback) {
                successCallback();
            } else {
                state.loginAlert.isOpen = false;
            }
        };
    },
    showMessageAlert(state, options) {
        Object.assign(state.messageAlert, options);
        state.messageAlert.isOpen = true;
    },
    closeMessageAlert(state, options) {
        state.messageAlert.isOpen = false;
    },
    setLoginStatus(state) {
        if (BrowserUtil.isFormApp()) {
            state.isLogined = getAppLoginStatus(state);
        } else {
            state.isLogined = !!state.infos.id;
        }
    },
    setLoginToken(state) {
        let logintoken = BrowserUtil.storage.getItem('logintoken') || BrowserUtil.storage.getItem('loginToken') || '';

        if (!state.infos.logintoken && logintoken) {
            state.infos.logintoken = logintoken;
        }
    },
    resetUserInfos(state) {
        state.infos = {
            uid: 0,
            nickname: '',
            logintoken: '',
            head_info: {
                link: ''
            }
        };
    }
};

function getAppLoginStatus(state) {
    if (window.localStorage.getItem('logat') || window.localStorage.getItem('logAt')) {
        let logintoken = window.localStorage.getItem('logintoken') || window.localStorage.getItem('loginToken');

        if (!logintoken || logintoken === 'false' || logintoken === 'null' || logintoken === '(null)') {
            return false;
        } else {
            return true;
        }
    }
}
