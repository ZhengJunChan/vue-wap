const newDay = {
    path: '2018_ji_fu',
    component: resolve => require(['@/activity/2018/ji-fu'], resolve),
    children: [{
        path: '',
        meta: {
            title: '集齐四汪，抢源音塘新年大奖',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/ji-fu/pages/home'], resolve)
    }, {
        path: 'addr',
        meta: {
            title: '填写兑奖信息',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/ji-fu/pages/addr'], resolve)
    }, {
        path: 'cards',
        meta: {
            title: '源音塘集福过新年',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/ji-fu/pages/cards'], resolve)
    }]
};

export default newDay;
