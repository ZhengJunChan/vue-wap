<template>
<div class="page_module" :class="showHeader ? 'top' : 'bottom'">
  <header-label class="header_label" v-show="showHeader"></header-label>

  <router-view class="container"></router-view>

  <download-label class="download" v-show="!showHeader" v-if="!hideDownload"></download-label>
</div>
</template>

<script type="text/javascript">
import { BrowserUtil } from '@/utils';
import { DownloadLabel, HeaderLabel } from '@/components';

const navs = ['home', 'topic', 'doing'];

export default {
    components: {
        DownloadLabel,
        HeaderLabel
    },
    computed: {
        showHeader() {
            return navs.filter(value => value === this.$route.name).length;
        },
        hideDownload() {
            return !BrowserUtil.isMobile();
        }
    }
};
</script>

<style lang="less" scoped>
@import './base.less';
</style>
