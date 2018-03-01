<!-- [header_label_component]   @Author: 郑君婵   @DateTime: 2017-10-20 -->
<template>
  <div class="header_label_component">
  	<div class="back" @click="$router.go(-1)">
  		<img src="./../../imgs/common/icon_back_white.png">
  	</div>
    <h1 class="text_nowrap_ellipsis" v-text="title"></h1>
  </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    watch: {
        title(val) {
            if (val) {
                document.title = val;
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
