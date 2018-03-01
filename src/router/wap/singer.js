const singer = {
    path: '/singer',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: '',
        component: resolve => require(['@/pages/singer'], resolve)
    }, {
        path: ':id',
        component: resolve => require(['@/pages/singer/detail'], resolve),
        children: [{
            path: '',
            meta: {
                tabIndex: 1
            },
            name: 'musicianDetailHome',
            component: resolve => require(['@/pages/singer/detail/home'], resolve)
        }, {
            path: 'detail/release',
            meta: {
                tabIndex: 2
            },
            name: 'musicianDetailMusic',
            component: resolve => require(['@/pages/singer/detail/release'], resolve)
        }, {
            path: 'detail/sheet',
            meta: {
                tabIndex: 3
            },
            name: 'musicianDetailSongSheet',
            component: resolve => require(['@/pages/singer/detail/sheet'], resolve)
        }, {
            path: 'detail/topic',
            meta: {
                tabIndex: 4
            },
            name: 'musicianDetailTopic',
            component: resolve => require(['@/pages/singer/detail/topic'], resolve)
        }]
    }, {
        path: ':id/sheet',
        name: 'likesSongSheetDetails',
        component: resolve => require(['@/pages/singer/like-musics'], resolve)
    }]
};

export default singer;
