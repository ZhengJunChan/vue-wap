<template>
    <div class="seven-page">
      <div class="content">
        <svg id="music-img-warp" :viewBox="`0, 0, 150, 150`">
          <g>
            <image xlink:href="./../image/P7/icon3.png"
                   width="0"
                   class="music-one"
                   x="0"
                   y="0"
                   height="0">
              <animate attributeName="x" begin="0s" values="0;45;75;125" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="y" begin="0s" values="0;15;30;18" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="opacity" begin="0s" values="0.4;1;1;0" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="width" begin="0s" values="0;23;23" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="height" begin="0s" values="0;19;19" dur="4s"
                       repeatCount="indefinite"></animate>
            </image>
            <image xlink:href="./../image/P7/icon3.png"
                   width="0"
                   class="music-one"
                   x="0"
                   y="0"
                   height="0">
              <animate attributeName="x" begin="-2s" values="0;45;75;125" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="y" begin="-2s" values="0;15;30;18" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="opacity" begin="-2s" values="0.4;1;1;0" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="width" begin="-2s" values="0;23;23" dur="4s"
                       repeatCount="indefinite"></animate>
              <animate attributeName="height" begin="-2s" values="0;19;19" dur="4s"
                       repeatCount="indefinite"></animate>
            </image>
          </g>

        </svg>
        <div class="number-warp">
         <div class="type">{{isSelf?'你':'TA'}}发布了<img src="./../image/P7/icon1.png" class="one"/> <span v-text="info.count||0">233</span>首歌</div>
          <div class="type">共计收听超过 <img src="./../image/P7/icon2.png" class="two"/> <span v-text="info.playcouns||0">322</span>次</div>
          <div class="name-music">单曲<span v-text="info.first.title||''">《童话镇》</span></div>
          <div>累计收听超过<span v-text="info.first.counts||0">666</span>次</div>
        </div>
        <img src="./../image/P7/img_frame@2x.png" alt="" class="img-frame">
      </div>
      <div class="end-zone">
        <p class="text">为{{isSelf?'你':'TA'}}疯狂打Call~</p>
        <div class="img-warp">
          <img src="./../image/P7/img@2x.png" alt="">
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
            info: {
                type: Object,
                default() {
                    return {
                        first: {
                            title: '',
                            counts: 0
                        }
                    };
                }
            }
        }
    };
</script>
<style lang="less">
    @import './../less/7.less';
</style>
