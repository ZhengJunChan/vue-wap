import ApiUtil from '@/utils/api-util.js';

export default {
    /**
     * [logout 退出]
     * @Author   郑君婵
     * @DateTime 2017-08-18
     */
    logout() {
        return ApiUtil.post('/v2/api/user/logout');
    },
    /**
     * [getUserInfos 获取用户信息]
     * @Author   郑君婵
     * @DateTime 2017-12-04
     */
    getUserInfos() {
        return ApiUtil.get('/v2/api/member.member/read');
    },
    /**
     * [sendCode 发送验证码]
     * @Author   郑君婵
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    sendCode(params) {
        return ApiUtil.post(`/v2/api/code/sendcode`, params);
    },
    /**
     * [sendCode 发送绑定手机验证码]
     * @Author   郑君婵
     * @DateTime 2017-08-21
     */
    sendCodeForBind(params) {
        return ApiUtil.get('/v2/api/send_code', params);
    },
    /**
     * [fastLogin 快速登录]
     * @Author   郑君婵
     * @DateTime 2017-05-17
     */
    fastLogin(params) {
        return ApiUtil.post('/v2/api/user/explogin', params);
    },
    /**
     * [bindMobile 绑定手机号]
     * @Author   郑君婵
     * @DateTime 2017-05-17
     * @return   {[type]}          [Promise Object]
     */
    bindMobile(params) {
        return ApiUtil.post('/v2/api/member.member/addbind', params);
    }
};
