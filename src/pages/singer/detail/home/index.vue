<!-- [音乐人详情-主页]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
<div class="home_page">
    <div class="body">
      	<div>
            <box-title :title="titles.singer.intro.desc" :icon="titles.singer.intro.icon"></box-title>

            <div class="intro">
                <p class="desc" v-text="$parent.singerInfos.signature"></p>

                <ul>
                    <li class="clear_float">
                        <p class="title fl">性别：</p>
                        <p class="text fl" v-text="$parent.singerInfos.sex ? '男' : '女'"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">所在地：</p>
                        <p class="text fl" v-text="($parent.singerInfos.province + $parent.singerInfos.city) || '无'"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">生日：</p>
                        <p class="text fl" v-text="$parent.singerInfos.day || '无'"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">个人链接：</p>
                        <p class="text fl">
                            <router-link :to="$parent.singerInfos.xlbind" v-if="$parent.singerInfos.xlbind">
                                <img class="wei_bo_img" src="./../../../../imgs/common/icon_musician_weibo.png">
                            </router-link>
                            <span v-else>无</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <box-title :title="titles.singer.dynamic.desc" :icon="titles.singer.dynamic.icon"></box-title>
        </div>
    </div>

    <div class="dynamics">
        <dynamic-list :list="dynamics" v-if="dynamics.length"></dynamic-list>
        <empty-tip v-if="initDynamics && !dynamics.length">
            <p>TA还没有动态呢</p>
            <p> ╮(๑•́ ₃•̀๑)╭</p>
        </empty-tip>
    </div>

    <div class="more" v-if="page.totalCount > page.perPage">
        <more-btn text="查看全部动态"></more-btn>
    </div>
</div>
</template>

<script type="text/javascript">
import titles from '@/pages/title.js';
import SingerApi from './../../singer-api.js';

import { BoxTitle, MenuBar, DynamicList, MoreBtn, EmptyTip } from '@/components';

export default {
    components: {
        BoxTitle,
        MenuBar,
        DynamicList,
        MoreBtn,
        EmptyTip
    },
    data() {
        return {
            titles,
            initDynamics: false,
            dynamics: [],
            page: {
                perPage: 3,
                totalCount: 0
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getSingerDynamics();
        },
        getSingerDynamics() {
            let params = {
                row: this.page.perPage,
                uid: this.$parent.singerId
            };

            SingerApi.getSingerDynamics(params).then((res) => {
                this.initDynamics = true;

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.dynamics = res.data;      // 轮播列表
                this.page = res.page;
            }, (error) => {
                this.initDynamics = true;
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
