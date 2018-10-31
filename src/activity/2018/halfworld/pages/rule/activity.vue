<template>
  <div class="rule_page">
    <rule class="item" :title-img="imgTitle.pingxuanfangshi" :content="$parent.activity.rule.mode.content"></rule>
  	<rule class="item" :title-img="imgTitle.zhuyishixiang" :content="$parent.activity.rule.rule.content"></rule>
  </div>
</template>

<script type="text/javascript">
import Rule from './../../components/rule';
import imgTitle from './config.js';

export default {
    components: {
        Rule
    },
    data() {
        return {
            imgTitle
        };
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
