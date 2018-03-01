const bulletin = {
    path: '/bulletin',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        component: resolve => require(['@/pages/bulletin/detail'], resolve)
    }]
};

export default bulletin;
