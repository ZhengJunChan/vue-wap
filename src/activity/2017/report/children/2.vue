<template>
    <div class="two-page">
      <div class="frame-zone">
      <div class="frame-warp">
        <p class="title">{{isSelf?'你':'TA'}}在<span
          v-text="info.split('-')[0]"></span>年<span
          v-text="info.split('-')[1]">12</span>月<span
          v-text="info.split('-')[2]">39</span>日
          <!--<span>99</span>时-->
        </p>
        <p class="text">加入了源音塘</p>
      </div>
      </div>
      <div class="text-emo-zone">
        <div class="text-warp">
          <p class="title">缘</p>
          <p class="text">妙不可言</p>
        </div>
        <div class="image-warp">
          <div class="music-warp">
            <img src="./../image/P2/icon_music@2x.png" class="music-ico">
          </div>
          <img src="./../image/P2/img_yxy@2x.png" class="yxy-ico">
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            isSelf: '',
            info: ''
        }
    };
</script>
<style lang="less">
    @import './../less/2.less';
</style>
