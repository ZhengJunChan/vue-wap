/**
 * Created by Administrator on 2018/1/15.
 */
const invite = {
    path: '/invite',
    meta: {
        title: '邀请好友',
        pageType: 'page'
    },
    component: resolve => require(['@/pages/invite-friend'], resolve)
};

export default invite;
