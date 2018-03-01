<template>
    <div class="gather-page-bless">
      <div class="bless-img" :style="{'backgroundImage': `url(${info.imgpic_link?info.imgpic_link+'/543/720':''})`}" @click="viewBigFn(info.imgpic_link)">

      </div>
      <p class="title">恭喜你抽中</p>
      <p class="name" v-text="info.title||''"></p>
      <p class="text">凑齐四只狗可以领取源音塘新年大礼包哦</p>
      <button type="button" class="save" @click="goBlessIndexPage">去拼图首页</button>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            info: {
                type: Object
            }
        },
        methods: {
            viewBigFn(url) {
                url && this.callAppFunction('previewer', {list: [{src: url}], index: 0});
            },
            goBlessIndexPage() {
                this.$router.push(`/activity/2018_ji_fu/cards?type=${this.info.type}`);
            }
        }
    };
</script>
<style lang="less" scoped>
    @import 'index.less';
</style>
