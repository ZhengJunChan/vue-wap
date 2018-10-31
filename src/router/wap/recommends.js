const recommends = [{
    path: '/recommends',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        component: resolve => require(['@/pages/recommends'], resolve)
    }]
}];

export default recommends;
