<template>
  <div class="pets_plate_box">
  <div class="pets_content_box">
    <div class="pets_btn" v-text="title"></div>
    <div class="box_decorate">
      <img src="../img/pic_raduis.png" alt="">
      <img src="../img/pic_raduis.png" alt="">
      <img src="../img/pic_raduis.png" alt="">
      <img src="../img/pic_raduis.png" alt="">
    </div>
    <div class="content_main">
      <slot></slot>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  export default {
      props: {
          title: String
      }
  };
</script>
<style lang="less" scoped>
  @import "./index.less";
</style>
