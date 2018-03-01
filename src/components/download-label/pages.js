//注：type为页面打开类型，url为需要打开页面地址，id为歌曲、池塘、音乐人等的id
//    type为page时，url为约定字段
//    type为activity时，url为完整网址
export default {
	// 首页*
    home: {
        type: 'page',
        url: 'home' 
    },
    // 音乐详情*
    musicDetails: {
        type: 'page',
        url: 'musicDetails',
        id: 111
    },
    // 歌单详情*
    songSheetDetails: {
        type: 'page',
        url: 'songSheetDetails',
        id: 111
    },
    // 音乐人详情-主页**
    musicianDetailHome: {
        type: 'page',
        url: 'musicianDetailHome',
        id: 111
    },
    // 音乐人详情-音乐*
    musicianDetailHome: {
        type: 'page',
        url: 'musicianDetailMusic',
        id: 111
    },
    // 音乐人详情-歌单*
    musicianDetailHome: {
        type: 'page',
        url: 'musicianDetailSongSheet',
        id: 111
    },
    // 音乐人详情-池塘*
    musicianDetailHome: {
        type: 'page',
        url: 'musicianDetailTopic',
        id: 111
    },
    // ta喜欢的歌单详情*
    likesSongSheetDetails: {
        type: 'page',
        url: 'likesSongSheetDetails',
        id: 111
    },
    // 池塘详情
    musicDetails: {
        type: 'page',
        url: 'topicDetails',
        id: 111
    }
};
