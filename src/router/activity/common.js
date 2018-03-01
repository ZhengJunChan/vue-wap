/**
 * 次元音乐会
 */
const common = [{
    path: '/input_prize_addr',
    meta: { title: '填写兑奖信息' },
    component: resolve => require(['@/activity/common/address'], resolve)
}];

export default common;
