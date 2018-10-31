<!-- [top_type_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="top_type_component">
    <y-scroller-item class="y_scroller item" :info="item" v-for="item in list" :key="item.id" v-if="type === 'y-scroller'" />
</div>
</template>

<script type="text/javascript">
import TopApi from './../top-api.js';
import { RouterUtil } from '@/utils';

import YScrollerItem from './y-scroller-item';

export default {
    components: {
        YScrollerItem
    },
    props: {
        type: String
    },
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getTopTypes();
    },
    methods: {
        getTopTypes() {
            TopApi.getTopType().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.list = res.data;
            });
        },
        goDetail(params) {
            let link = `/top/?class_id=${params.id}&type=${params.type}&billboard_type=${params.billboardType}`;

            RouterUtil.go(link, this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
