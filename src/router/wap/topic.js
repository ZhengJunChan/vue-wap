const topic = {
    path: '/topic',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: 'detail',
        name: 'topicDetails',
        component: resolve => require(['@/pages/topic/detail'], resolve)
    }]
};

export default topic;
