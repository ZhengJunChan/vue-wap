<template>
    <div class="gather-page-home">
      <div class="page-home-error">
        <img src="./../../img/bg_newyear_blessing2.png" alt="">
        <div class="content-zone">
          <img src="./../../img/img_newyear_none.png" alt="">
          <p>哎呀，不小心掉入次元空间了</p>
          <button type="button" @click="goBack">返回</button>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            isFromApp: {
                type: Boolean
            }
        },
        methods: {
            goBack() {
                if (this.isFromApp) {
                    this.callAppFunction('goBack');
                } else {
                    this.$router.replace('/activity/2018_ji_fu');
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    @import 'index.less';
</style>
