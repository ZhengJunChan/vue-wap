const newDay = {
    path: 'sound',
    component: resolve => require(['@/activity/2018/sound'], resolve),
    children: [{
        path: '',
        meta: {
            title: '源音塘2周年 为音乐发声',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/home'], resolve)
    }, {
        path: 'detail',
        meta: {
            title: '源音塘2周年 为音乐发声',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/detail'], resolve)
    }, {
        path: 'list',
        meta: {
            title: '源音塘2周年 为音乐发声',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/list'], resolve)
    }, {
        path: 'rule/prize',
        meta: {
            title: '抽奖规则',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/rule/prize.vue'], resolve)
    }, {
        path: 'prize',
        meta: {
            title: '中奖记录',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/prize'], resolve)
    }, {
        path: 'addr/material',
        meta: {
            title: '填写实体地址',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/addr/material.vue'], resolve)
    }, {
        path: 'addr/virtual',
        meta: {
            title: '填写领取信息',
            pageType: 'activity'
        },
        component: resolve => require(['@/activity/2018/sound/pages/addr/virtual.vue'], resolve)
    }]
};

export default newDay;
