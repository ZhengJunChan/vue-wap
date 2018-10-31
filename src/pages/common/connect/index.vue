<template>
  <div></div>
</template>

<script type="text/javascript">

export default {
    created() {
        let returnUrl = this.$route.query.returnUrl;

        window.location.replace(returnUrl);
    }
};
</script>

<style lang="less" scoped>
// @import './bind-mobile.less';
</style>
