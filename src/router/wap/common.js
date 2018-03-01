/**
 * 公共页面路由
 * Created by 郑君婵 on 2017-09-20
 */

const common = [{
    name: 'download',
    path: '/download',
    meta: {
        title: '源音塘 - App下载页'
    },
    component: resolve => require(['@/pages/common/download'], resolve)
}, {
    path: '/cnect/info',
    meta: {
        title: '绑定手机'
    },
    component: resolve => require(['@/pages/common/bind-mobile'], resolve)
}, {
    path: '/cnect',
    meta: {
        title: '三方信息连接中'
    },
    component: resolve => require(['@/pages/common/connect'], resolve)
}, {
    path: '/fast_login',
    meta: {
        title: '快捷登录'
    },
    component: resolve => require(['@/pages/common/fast-login'], resolve)
}];

export default common;
