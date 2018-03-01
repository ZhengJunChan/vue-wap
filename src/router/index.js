/**
 * 项目路由
 * Created by 郑君婵 on 2017-05-24
 */

import Vue from 'vue';
import Router from 'vue-router';

import wap from './wap';
import activity from './activity';

import { RouterInterceptor } from '@/interceptors';

let routers = [{
    path: '*',
    redirect: '/'
}];

routers = routers.concat(wap, activity);

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: routers
});

RouterInterceptor(router, Vue);

export default router;
