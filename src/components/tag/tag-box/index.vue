<!-- [tag_box_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="tag_box_component" v-if="list.length">
    <h2 class="title " v-text="title"></h2>

  	<div class="tag_item" v-for="(tag, index) in list" v-text="tag.title"></div>
  </div>
</template>

<script type="text/javascript">

import BoxTitle from './../../box-title';

export default {
    components: {
        BoxTitle
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: '相关标签'
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
