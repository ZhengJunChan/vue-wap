/**
 * 次元音乐会
 */
const concert = [{
    path: '/ciyuan2017',
    component: resolve => require(['@/activity/2017/concert'], resolve),
    children: [{
        path: '',
        meta: { title: '次元音乐会' },
        component: resolve => require(['@/activity/2017/concert/pages/sell'], resolve)
    }, {
        path: 'prize',
        meta: { title: '次元音乐会' },
        component: resolve => require(['@/activity/2017/concert/pages/prize'], resolve)
    }, {
        path: 'address',
        meta: { title: '填写兑奖信息' },
        component: resolve => require(['@/activity/2017/concert/pages/address'], resolve)
    }]
}];

export default concert;
