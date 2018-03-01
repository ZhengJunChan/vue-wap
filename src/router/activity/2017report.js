/**
 * Created by Administrator on 2018/1/4.
 */
const report2017 = {
    path: '/report2017',
    component: resolve => require(['@/activity/2017/report/index.vue'], resolve),
    meta: {
        title: '你的2017源音塘专属年报',
        pageType: 'activity'
    },
    name: 'report2017',
    children: [
        {
            path: '*',
            redirect: {name: 'report2017'}
        }
    ]
};
export default report2017;
