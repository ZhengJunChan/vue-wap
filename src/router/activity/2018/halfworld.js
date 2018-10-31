const halfWorld = {
    path: 'halfworld',
    component: resolve => require(['@/activity/2018/halfworld'], resolve),
    children: [{
        path: '',
        meta: {
            title: '《半世界之旅》主题曲翻唱&CV大赛',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/home'], resolve)
    }, {
        path: 'rule/activity',
        meta: {
            title: '活动参与规则',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/rule/activity.vue'], resolve)
    }, {
        path: 'rule/prize',
        meta: {
            title: '抽奖规则',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/rule/prize.vue'], resolve)
    }, {
        path: 'prize',
        meta: {
            title: '中奖记录',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/prize'], resolve)
    }, {
        path: 'addr/material',
        meta: {
            title: '填写实体地址',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/addr/material.vue'], resolve)
    }, {
        path: 'addr/virtual',
        meta: {
            title: '填写领取信息',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/addr/virtual.vue'], resolve)
    }, {
        path: 'luck-draw',
        meta: {
            title: '抽奖',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/luck-draw'], resolve)
    }, {
        path: 'vote',
        meta: {
            title: '为我投票吧',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/halfworld/pages/vote'], resolve)
    }]
};

export default halfWorld;
