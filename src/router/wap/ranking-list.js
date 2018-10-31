const rankingList = {
    path: '/top',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        name: 'top',
        meta: {
            appParams: {
                class: '',
                type: '',
                billboard_type: '',
                toggle_id: ''
            },
            passRoute: true
        },
        component: resolve => require(['@/pages/ranking-list'], resolve)
    }, {
        path: 'navs',
        meta: {
            title: '排行榜'
        },
        component: resolve => require(['@/pages/top/nav-list'], resolve)
    }]
};

export default rankingList;
