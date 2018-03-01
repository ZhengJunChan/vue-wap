/**
 * Created by Administrator on 2018/1/23.
 */
const gatherPrize = {
    path: '2018_gather_prize',
    component: resolve => require(['@/activity/2018/gather-prize/index.vue'], resolve),
    meta: {
        title: '集齐四汪，抢源音塘新年大奖',
        pageType: 'activity'
    },
    name: 'gatherPrize2018Page'
    // children: [
    //     {
    //         meta: {
    //             title: '',
    //             pageType: 'activity'
    //         },
    //         name: 'gatherPrize2018Index',
    //         path: '',
    //         component: resolve => require(['@/activity/2018/gather-prize/pages/error/index.vue'], resolve)
    //     },
    //     {
    //         meta: {
    //             title: '语音祝福',
    //             pageType: 'activity'
    //         },
    //         name: 'gatherPrize2018Sound',
    //         path: 'sound',
    //         component: resolve => require(['@/activity/2018/gather-prize/pages/sound/index.vue'], resolve)
    //     },
    //     {
    //         meta: {
    //             title: '甜甜圈祝福',
    //             pageType: 'activity'
    //         },
    //         name: 'gatherPrize2018Coin',
    //         path: 'coin',
    //         component: resolve => require(['@/activity/2018/gather-prize/pages/coin/index.vue'], resolve)
    //     },
    //     {
    //         meta: {
    //             title: '2018新年福签',
    //             pageType: 'activity'
    //         },
    //         name: 'gatherPrize2018Ticket',
    //         path: 'ticket',
    //         component: resolve => require(['@/activity/2018/gather-prize/pages/ticket/index.vue'], resolve)
    //     },
    //     {
    //         meta: {
    //             title: '抽中狗拼图',
    //             pageType: 'activity'
    //         },
    //         name: 'gatherPrize2018Bless',
    //         path: 'bless',
    //         component: resolve => require(['@/activity/2018/gather-prize/pages/bless/index.vue'], resolve)
    //     }
    // ]
};
export default gatherPrize;
