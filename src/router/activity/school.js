const school = [{
    path: '/2017school',
    component: resolve => require(['@/activity/2017/school'], resolve),
    children: [{
        path: '',
        name: 'acivitySchoolHome',
        meta: { title: '源音塘报名' },
        component: resolve => require(['@/activity/2017/school/home'], resolve)
    }, {
        path: 'share',
        meta: { title: '源音塘报名' },
        component: resolve => require(['@/activity/2017/school/share/index.vue'], resolve),
        beforeRouteUpdate(to, from, next) {
            if (from.name === 'acivitySchoolHome') {
                this.isFromHome = true;
            }

            next();
        }
    }]
}, {
    path: '/2017school/vote',
    meta: { title: '筑梦之路.源音塘校园音乐大赛' },
    component: resolve => require(['@/activity/2017/school/vote/index.vue'], resolve)
}];

export default school;
