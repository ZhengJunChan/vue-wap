<!-- [singer_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="singer_detail_page">
  	<singer-header :info="singerInfos"></singer-header>

    <menu-bar :menu="menus" :active-tab="activeTab"></menu-bar>

    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import SingerApi from './../singer-api.js';

import { SingerHeader, MenuBar } from '@/components';

export default {
    components: {
        SingerHeader,
        MenuBar
    },
    data() {
        return {
            menus: [{
                title: '主页',
                link: '/singer/' + this.$route.params.id
            }, {
                title: '音乐',
                link: '/singer/' + this.$route.params.id + '/detail/release'
            }, {
                title: '歌单',
                link: '/singer/' + this.$route.params.id + '/detail/sheet'
            }, {
                title: '池塘',
                link: '/singer/' + this.$route.params.id + '/detail/topic'
            }],
            activeTab: this.$route.meta.tabIndex,
            singerId: this.$route.params.id,
            singerInfos: {}
        };
    },
    watch: {
        '$route.params.id': function (id) {
            this.singerId = id;

            this.init();
        },
        '$route.meta.tabIndex': function (index) {
            this.activeTab = index;
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getSingerInfo();
        },
        getSingerInfo() {
            let params = {
                uid: this.singerId
            };

            SingerApi.getSingerInfo(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.singerInfos = res.data;      // 轮播列表
                this.$parent.title = this.singerInfos.nickname;

                this.$share({
                    imgUrl: res.data.head_link,
                    desc: res.data.signature,
                    title: res.data.nickname
                });
            }, (error) => {
                this.$toast.error(error.msg || '获取数据失败');
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
