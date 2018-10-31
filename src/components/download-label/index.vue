<template>
  <div class="download_component">
  	<div class="download_btn" @click="download" v-text="btnName"></div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        size: [Number],
        headerImg: String,
        noCompress: Boolean,
        borderColor: String,
        vip: [Boolean, Number],
        headerId: [Boolean, Number]
    },
    computed: {
        btnName() {
            // return this.$route.meta.downloadLabelName || '退出登录';
            return this.$route.meta.downloadLabelName || '打开APP';
        }
    },
    methods: {
        download() {
            // this.$store.dispatch('logout');
            RouterUtil.download(this.$router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
