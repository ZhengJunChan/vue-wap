<template>
  <div class="rule_page">
  	<rule class="item" :title-text="item.title" :content="item.content" v-for="item in $parent.activity.rule_list" :key="item.alias"></rule>
  	<!-- <rule class="item" :title="imgTitle.ways" :content="$parent.activity.rule.mode"></rule>
  	<rule class="item" :title="imgTitle.activityRule" :content="$parent.activity.rule.selection"></rule> -->
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
