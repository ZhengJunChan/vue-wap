import common from './common.js';  // 公共页面相关路由
import home from './home.js';     // 首页相关路由
import songSheet from './song-sheet.js';     // 首页相关路由
import singer from './singer.js';     // 音乐人相关路由
import topic from './topic.js';       // 池塘相关路由
import bulletin from './bulletin.js';       // 文章列表相关路由
import invite from './invite.js';       // 邀请好友相关路由
import helpCenter from './help-center.js';       // 帮助中心相关路由
import rankingList from './ranking-list.js';       // 排行榜相关路由
import doing from './doing.js';       // 活动相关路由
import recommends from './recommends.js';       // 活动相关路由

let wap = [
    home,
    singer,
    topic,
    bulletin,
    invite,
    helpCenter,
    rankingList,
    doing
];

wap = wap.concat(songSheet, common);
wap = wap.concat(songSheet, common, recommends);

export default wap;
