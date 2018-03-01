<template>
  <div class="six-page">
    <div class="content-zone">
      <div class="head-warp" :style="{'backgroundImage': `url(${info.music_head_link?info.music_head_link+'/160/160':''})`}">
      </div>
      <p class="user-name" v-text="info.music_nickname">钦墨</p>
      <p class="user-text" v-if="isSelf">你2017<span>最喜爱</span>的音乐人<br>
        TA的音乐是否在某一刻给你力量<br>
        让你勇敢~</p>
      <p class="user-text" v-else>TA2017<span>最喜爱</span>的音乐人<br>
        总有些音乐在某一刻<br>
        给TA温暖</p>
      <div class="yxy-zone">

        <div class="yxy-warp">
          <svg :viewBox="`0, 0, 309, 390`"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g fill="none" fill-rule="evenodd">
              <image xlink:href="./../image/P6/img_note_b@2x.png"
                     :width="12" :height="22">
                <animate attributeName="x" begin="0s" values="110;40" dur="2s" calcMode="spline"
                         keySplines=".28,.44,.57,.71" repeatCount="indefinite"></animate>
                <animate attributeName="y" begin="0s" values="225;230;235;230;220;210" dur="2s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="opacity" begin="0s" values="0.4;1;1;1;1;0" dur="4s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="width" begin="0s" values="2;12" dur="2s" calcMode="spline"
                         keySplines=".1,.51,.62,.93" repeatCount="indefinite"></animate>
                <animate attributeName="height" begin="0s" values="4;22" dur="2s" calcMode="spline"
                         keySplines=".1,.51,.62,.93" repeatCount="indefinite"></animate>
              </image>
              <image xlink:href="./../image/P6/img_note@2x.png"
                     :width="18" :height="20">
                <animate attributeName="x" begin="-1s" values="110;90;80;70;60;50;40" dur="2s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="y" begin="-1s" values="225;230;235;230;220;210" dur="2s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="opacity" begin="0s" values="0.4;1;1;1;1;0" dur="4s"
                         repeatCount="indefinite"></animate>
                <animate attributeName="width" begin="-1s" values="2;12" dur="2s" calcMode="spline"
                         keySplines=".1,.51,.62,.93" repeatCount="indefinite"></animate>
                <animate attributeName="height" begin="-1s" values="4;22" dur="2s" calcMode="spline"
                         keySplines=".1,.51,.62,.93" repeatCount="indefinite"></animate>
              </image>
            </g>
          </svg>
          <!--<img src="./../image/P6/img_note_b@2x.png" alt="" class="one">-->
          <!--<img src="./../image/P6/img_note@2x.png" alt="" class="two">-->
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            isSelf: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            info: ''
        },
        computed: {
            rem() {
                return this.$parent.$rem;
            }
        }
    };
</script>
<style lang="less">
  @import './../less/6.less';
</style>
