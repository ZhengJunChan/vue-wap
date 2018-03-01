/**
 * Created by Administrator on 2018/1/26.
 */
import ApiUtil from '@/utils/api-util.js';
let v = '/v2/api';
const activityId = '2018chinayear';
export default {
    /**
     * [acceptPrize 收下奖品]
     * @Author   [yangbin]
     */
    acceptPrize(id, params) {
        if (params) {
            return ApiUtil.post(`${v}/lottery/postaddr?id=${id}`, params);
        } else {
            return ApiUtil.post(`${v}/lottery/postaddr?id=${id}`);
        }
    },
  /**
   * 作者:[yangbin]
   * 时间: 2018/1/11 9:58
   * 功能介绍：年报数据获取
   * 参数：uid
   */
    gologin() {
        // ApiUtil.post(`${v}/user/login`, {
        //     loginname: '13076071337',
        //     password: '123456',
        //     session: 1
        // }).then((res) => {
        //     window.localStorage.setItem('logintoken', res.data.logintoken);
        // });
    },
    setGether2018Data: function (params) {
        return ApiUtil.get(`${v}/lottery/letsgo/${activityId}`, params);
    },
    getGether2018Data: function (params) {
        return ApiUtil.get(`${v}/lottery/getrecord`, params);
    }
};
