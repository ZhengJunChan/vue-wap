const fallactivity = {
    path: '/autumnvote2017',
    component: resolve => require(['@/activity/2017/fall-activity'], resolve),
    redirect: {name: 'fallActivity'},
    children: [{
        path: '',
        name: 'fallActivity',
        meta: {
            title: '源音塘-秋日祭音乐会'
        },
        component: resolve => require(['@/activity/2017/fall-activity/fall-content'], resolve)
    },
    {
        path: 'rule',
        name: 'ruleActivity',
        meta: {
            title: '源音塘-秋日祭音乐会'
        },
        component: resolve => require(['@/activity/2017/fall-activity/rule'], resolve)
    },
    {
        path: 'works',
        name: 'entriesActivity',
        meta: {
            title: '源音塘-秋日祭音乐会'
        },
        component: resolve => require(['@/activity/2017/fall-activity/entries'], resolve)
    },
    {
        path: 'great-works',
        name: 'workActivity',
        meta: {
            title: '源音塘-秋日祭音乐会'
        },
        component: resolve => require(['@/activity/2017/fall-activity/award-work'], resolve)
    }
    ]
};

export default fallactivity;
