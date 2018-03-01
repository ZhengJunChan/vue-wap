<template>
<div class="page_module" :class="{'wei_xin': isFromWX}">
  <header-label class="header_label" :title="title"></header-label>

  <router-view class="container"></router-view>

  <download-label class="download"></download-label>
</div>
</template>

<script type="text/javascript">
import { BrowserUtil } from '@/utils';
import { DownloadLabel, HeaderLabel } from '@/components';

export default {
    components: {
        DownloadLabel,
        HeaderLabel
    },
    data() {
        return {
            title: document.title
        };
    },
    computed: {
        isFromWX: () => BrowserUtil.isFormWeiXin()
    }
};
</script>

<style lang="less" scoped>
@import './base.less';
</style>
