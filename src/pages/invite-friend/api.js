/**
 * Created by Administrator on 2018/1/15.
 */
import ApiUtil from '@/utils/api-util.js';
let version = '/v2/api';
export default {
    getMsmCode(tel) {
        let params = tel ? {name: tel, type: 'reg'} : {};
        /* 发送验证码
         * name手机号或者邮箱
         * type reg注册,login登录,find找回密码，pwd修改密码，
         *      unbind解除绑定，sms快速登录/绑定
         * */
        return ApiUtil.get(`${version}/code`, params);
    },
    userRegister(params) {
        /* 注册接口
         * mobile是邮箱或者手机号
         * password是密码
         * nickname是昵称
         * code是验证码
         * incode邀请码
         * reg_at 注册来源
         * web=>pc端
         * ios=>ios端
         * android=>安卓端
         * wap=>手机h5
         * wx =>微信内部登录
         * wap_incode=>h5邀请码注册
         */
        return ApiUtil.post(`${version}/user/reg`, params);
    },
    checkCanUse(params, type = 'mobile') {
        /* 用户登录
         * name 用户昵称/手机号码/邮箱
         * type mobile 手机号码 email 邮箱   nickname 用户昵称
         * */
        return ApiUtil.post(`${version}/ajax/${type}`, params);
    },
    getMusicianInfoByCode: function (params) {
      /*
       *
       * uid: 用户ui
       * */
        return ApiUtil.get(`${version}/user/incode`, params);
    }
};
