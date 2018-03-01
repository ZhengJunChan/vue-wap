<template>
  <div class="rule_box">
    <introList :introList="descriptionList"></introList>
    <p>在法律允许的范围内源音塘拥有解释<br>
      如有问题请联系help@imxkj.com</p>
  </div>
</template>
<script type="text/javascript">
  import {descriptionDetail} from './data'; //  引入数据
  import introList from '@/components/intro-cell/detail.vue';
  export default {
      components: {
          introList
      },
      data() {
          return {
              descriptionList: descriptionDetail
          };
      }
  };

</script>
<style lang="less" scoped>
  @import './index.less';
</style>
