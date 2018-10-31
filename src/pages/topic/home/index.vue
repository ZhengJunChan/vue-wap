<!-- [topic_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="topic_page">
    <ul class="navs x_scroller">
        <li :class="{selected: index === selectedIndex}" v-for="(item, index) in navs.list" :key="item.key" @click="getTopicList(index)" v-text="item.title"></li>
    </ul>

    <topic-list :list="topics"></topic-list>
<!-- 
    <div class="more">
        <more-btn text="查看全部动态"></more-btn>
    </div> -->
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';
import TopicApi from './../topic-api.js';
import { CommonApi } from '@/api';
import { TopicList, MoreBtn } from '@/components';

export default {
    components: {
        TopicList,
        MoreBtn
    },
    data() {
        return {
            selectedIndex: 0,
            navs: [],
            topics: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getNavs();
        },
        getNavs() {
            let params = {
                alias: 'topic'
            };

            CommonApi.getNavs(params).then((res) => {
                if (res.code !== 200) {
                    return;
                }

                this.navs = res.data.where[0];
                (this.navs.list.length > 0) && this.getTopicList();
            });
        },
        getTopicList(index) {
            let params = {
                row: 30,
                order: 'update_time-desc'
            };

            this.selectedIndex = index || 0;
            params[this.navs.field] = this.navs.list[this.selectedIndex].id;

            TopicApi.getTopicList(params).then((res) => {
                if (res.code !== 200) {
                    return;
                }

                this.topics = res.data.data_list;
            });
        },
        download() {
            RouterUtil.download(this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
