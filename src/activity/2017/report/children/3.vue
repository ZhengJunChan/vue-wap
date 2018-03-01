
<template>
    <div class="three-page">
      <div class="content-zone">
        <div class="head-warp" :style="{'backgroundImage': `url(${info.imgpic_link?info.imgpic_link+'/160/160':''})`}">

        </div>
        <p class="title">{{isSelf?'你':'TA'}}邂逅的第一首歌是</p>
        <p class="text"><span v-text="info.title">《童话镇》</span><br><span class="small" v-text="info.music_nickname">默默</span></p>
        <p class="notice" v-text="isSelf?'还记得当时的心情吗':'回忆总是如此美好'"></p>
        <div class="image-zone">
          <img src="./../image/P3/star1@2x.png" class="four">
          <img src="./../image/P3/star3@2x.png" class="one">
          <img src="./../image/P3/star5@2x.png" class="three">
          <img src="./../image/P3/star4@2x.png" class="two">
          <img src="./../image/P3/star4@2x.png" class="five">
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            isSelf: '',
            info: ''
        },
        mounted() {
            var stars = document.querySelectorAll('.image-zone img');
            for (let s = 0; s < stars.length; s++) {
                let t = 2 + Math.random() * 1;
                stars[s].style.cssText = `-webkit-animation:threePageStars ${t}s linear 1ms infinite;animation:threePageStars ${t}s linear 1ms infinite;`;
            }
        }
    };
</script>
<style lang="less">
    @import './../less/3.less';
</style>
