const newDay = {
    path: '/2018_new_day',
    component: resolve => require(['@/activity/2018/new-day'], resolve),
    children: [{
        path: '',
        meta: {
            title: '新年抽奖',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/new-day/pages/home'], resolve)
    }, {
        path: 'rule',
        meta: {
            title: '规则说明',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/new-day/pages/rule'], resolve)
    }, {
        path: 'prize',
        meta: {
            title: '奖品箱',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/new-day/pages/prize'], resolve)
    }, {
        path: 'addr',
        meta: {
            title: '填写兑奖信息',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/new-day/pages/addr'], resolve)
    }]
};

export default newDay;
