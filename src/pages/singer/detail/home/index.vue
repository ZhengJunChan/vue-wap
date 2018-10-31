<!-- [音乐人详情-主页]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
<div class="home_page">
    <div class="box base_info">
        <h2 class="title">基本信息</h2>

        <div>
            <div>
                <div class="item">
                    <p class="prototype">性别</p>
                    <p v-text="$parent.singerInfos.sex ? '男' : '女'"></p>
                </div>
                <div class="item">
                    <p class="prototype">年龄</p>
                    <p v-text="$parent.singerInfos.age"></p>
                </div>
            </div>
            <div class="label">
                <div class="item">
                    <p class="prototype">星座</p>
                    <p v-text="$parent.singerInfos.constellation"></p>
                </div>
                <div class="item">
                    <p class="prototype">所在地</p>
                    <p  v-text="addr"></p>
                </div>
            </div>
        </div>
    </div>

    <div class="box">
        <h2 class="title">个人简介</h2>

        <div v-text="$parent.singerInfos.signature || '这家伙很懒..懒....懒.......什么都没留下(￣▽￣)／'"></div>
    </div>

    <div class="box tag_box" v-if="$parent.singerInfos.interest_tag.length">
        <h2 class="title">感兴趣的</h2>

        <ul class="tag_list">
            <li class="tag" v-for="(item, index) in $parent.singerInfos.interest_tag" :key="index" v-text="item.title"></li>
        </ul>
    </div>

    <div class="box tag_box" v-if="$parent.singerInfos.identity_tag.length">
        <h2 class="title">TA的标签</h2>

        <ul class="tag_list">
            <li class="tag" v-for="(item, index) in $parent.singerInfos.identity_tag" :key="index" v-text="item.title"></li>
        </ul>
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
            },
            banner: []
        };
    },
    computed: {
        addr() {
            let addr = '';

            if (this.$parent.singerInfos.province_text) {
                addr += this.$parent.singerInfos.province_text;
            }

            if (this.$parent.singerInfos.city_text) {
                addr += this.$parent.singerInfos.city_text;
            }

            return addr || '未知';
        }
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
