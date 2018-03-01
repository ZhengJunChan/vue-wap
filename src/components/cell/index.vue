<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="cell_component">
        <div class="title" v-text="title" :style="{backgroundImage: `url(${icon})`}">热门</div>

        <div class="link_arrow_tags" @click="getDownloadPage()">
            <img @click="gotoHotTags('/topic/hot-tags')" src="./imgs/icon_index_more.png"/>
        </div>
    </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        title: String,
        icon: String
    },
    methods: {
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
