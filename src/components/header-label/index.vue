<!-- [header_label_component]   @Author: 郑君婵   @DateTime: 2017-10-20 -->
<template>
  <div class="header_label_component">
  	<ul class="nav">
  		<li>
  			<router-link :class="{active: $route.name === 'home'}" to="/">首页</router-link>
  		</li>
  		<li>
        <router-link :class="{active: $route.name === 'topic'}" to="/topic">池塘</router-link>
  		</li>
  		<li>
  			<router-link :class="{active: $route.name === 'doing'}" to="/doing">活动</router-link>
  		</li>
  	</ul>

  	<div class="download_btn" @click="download">打开APP</div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    methods: {
        download() {
            RouterUtil.download(this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
