const rankingList = {
    path: '/doing',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        name: 'doing',
        component: resolve => require(['@/pages/doing/list'], resolve)
    }]
};

export default rankingList;
