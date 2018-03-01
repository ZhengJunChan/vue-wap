import ApiUtil from '@/utils/api-util.js';
let v = '/v2/api';
export default {
  /* 广告 */
    getAdvertisement: function (params) {
        return ApiUtil.get(v + '/activity/getLink/' + params.alias);
    },
    getActivity: function (params) {
        return ApiUtil.get(v + '/activity/read/' + params.alias);
    }
};
