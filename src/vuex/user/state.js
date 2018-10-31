export default {
    // 是否登录
    isLogined: false,
    isRequiredInfo: false,
    // 用户信息
    infos: {
        uid: 0,
        nickname: '',
        logintoken: '',
        head_info: {
            link: ''
        }
    },
    loginAlert: {
        isOpen: false,
        successCallback() {}
    },
    messageAlert: {
        btn: {
            text: '留言'
        },
        id: '',
        min: 1,
        max: 140,
        type: '',
        title: '',
        isOpen: false,
        submitCallback: () => {}
    }
};
