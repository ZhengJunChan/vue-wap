<!-- [nav_list]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <ul class="doing_list">
  	<li v-for="item in list" :key="item.id" @click="go(item.url)">
  		<div class="img" :style="{backgroundImage: `url(${item.imgpic_info ? $fixImg(item.imgpic_info.link, 'w=710&h=300') : ''})`}"></div>
  		<h2 class="title" v-text="item.title"></h2>
  	</li>
  </ul>
</template>

<script type="text/javascript">
import Api from './../api.js';
import { RouterUtil } from '@/utils';

export default {
    data() {
        return {
            list: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            Api.getActivityList().then(res => {
                if (res.code !== 200) {
                    return;
                }

                this.list = res.data.lists;
            });
        },
        go(url) {
            RouterUtil.go(url, this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
