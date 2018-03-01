/**
 * Created by Administrator on 2018/1/11.
 */
import ApiUtil from '@/utils/api-util.js';
let v = '/v2/api';
export default {
  /**
   * 作者:[yangbin]
   * 时间: 2018/1/11 9:58
   * 功能介绍：年报数据获取
   * 参数：uid
   */
    getTags() {
        return ApiUtil.get(`${v}/com/tag`, {pid: 1, item_id: 1, p: 1, row: 1});
    },
    getReport2017Data: function (id) {
        return ApiUtil.get(`${v}/musician/annual`, {uid: Boolean(id) === true ? id : 0});
    },
    followAllUser: function (id = '') {
        return ApiUtil.post(`${v}/member/relation/followAll`, {ids: id});
    }
};
