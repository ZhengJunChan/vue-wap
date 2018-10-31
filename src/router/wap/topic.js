const topic = {
    path: '/topic',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        name: 'topic',
        component: resolve => require(['@/pages/topic/home'], resolve)
    },
    {
        path: 'detail',
        name: 'topicDetails',
        meta: {
            title: '源音塘·音乐不止一种'
        },
        component: resolve => require(['@/pages/topic/detail'], resolve)
    }]
};

export default topic;
