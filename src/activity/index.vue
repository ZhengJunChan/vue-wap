<template>
<div class="activity_module" :class="{ wei_xin: isFromWX, from_app: isFromApp, from_pc: isFromPc }">
    <router-view class="activity_page"></router-view>
    <download-label class="download"></download-label>
</div>
</template>

<script type="text/javascript">
import { BrowserUtil } from '@/utils';
import { DownloadLabel, AlertBox } from '@/components';

export default {
    components: {
        DownloadLabel,
        AlertBox
    },
    computed: {
        isFromWX: () => BrowserUtil.isFormWeiXin(),
        isFromApp: () => BrowserUtil.isFormApp(),
        isFromPc: () => !BrowserUtil.isMobile()
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './activity.less';
</style>
