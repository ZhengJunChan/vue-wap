<template>
  <div></div>
</template>

<script type="text/javascript">

import { RouterUtil } from '@/utils';

export default {
    created() {
        let returnUrl = decodeURIComponent(this.$route.query.returnUrl);

        RouterUtil.go(returnUrl, this.$router);
    }
};
</script>

<style lang="less" scoped>
// @import './bind-mobile.less';
</style>
