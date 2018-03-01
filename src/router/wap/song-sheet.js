const songSheet = [{
    path: '/mlist',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: ':id',
        name: 'songSheetDetails',
        component: resolve => require(['@/pages/song-sheet/sheet-detail'], resolve)
    }]
}, {
    path: '/music',
    component: resolve => require(['@/pages'], resolve),
    children: [{
        path: ':id',
        name: 'musicDetails',
        component: resolve => require(['@/pages/song-sheet/music-detail'], resolve)
    }]
}];

export default songSheet;
