const newDay = {
    path: 'spring2018',
    component: resolve => require(['@/activity/2018/spring'], resolve),
    children: [{
        path: '',
        meta: {
            title: '春日狂想原创翻唱大赛',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/home'], resolve)
    }, {
        path: 'rule/activity',
        meta: {
            title: '活动参与规则',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/rule/activity.vue'], resolve)
    }, {
        path: 'rule/prize',
        meta: {
            title: '抽奖规则',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/rule/prize.vue'], resolve)
    }, {
        path: 'prize',
        meta: {
            title: '中奖记录',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/prize'], resolve)
    }, {
        path: 'addr/material',
        meta: {
            title: '填写实体地址',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/addr/material.vue'], resolve)
    }, {
        path: 'addr/virtual',
        meta: {
            title: '填写领取信息',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/addr/virtual.vue'], resolve)
    }, {
        path: 'award-setting',
        meta: {
            title: '奖项设置',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/award-setting'], resolve)
    }, {
        path: 'luck-draw',
        meta: {
            title: '抽奖',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/luck-draw'], resolve)
    }, {
        path: 'vote',
        meta: {
            title: '为我投票吧',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/spring/pages/vote'], resolve)
    }]
};

export default newDay;
