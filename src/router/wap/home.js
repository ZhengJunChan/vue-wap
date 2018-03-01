const home = {
    path: '/',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        name: 'home',
        meta: {
            title: '源音塘——全新的二次元音乐社区'
        },
        component: resolve => require(['@/pages/home'], resolve)
    }]
};

export default home;
