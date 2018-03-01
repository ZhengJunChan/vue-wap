<template>
    <div class="eleven-page">
      <svg class="music-warp":viewBox="`0, 0, 160, 160`">
      <g>
        <image xlink:href="./../image/P11/icon_music@2x.png"
               width="20"
               height="14">
          <animate attributeName="x" begin="0s" values="80;70;50;40;60;90;110" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0s" values="90;70;50;20;0" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="opacity" begin="0s" values="0;1;1;0" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="width" begin="0s" values="0;20;20" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="height" begin="0s" values="0;14;14" dur="4s"
                   repeatCount="indefinite"></animate>
        </image>
        <image xlink:href="./../image/P11/icon_music@2x.png"
               width="20"
               height="14">
          <animate attributeName="x" begin="-2s" values="80;70;50;40;60;90;110" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="-2s" values="90;70;50;20;0" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="opacity" begin="-2s" values="0;1;1;0" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="width" begin="-2s" values="0;20;20" dur="4s"
                   repeatCount="indefinite"></animate>
          <animate attributeName="height" begin="-2s" values="0;14;14" dur="4s"
                   repeatCount="indefinite"></animate>
        </image>
      </g>
      </svg>
      <div class="content-img">
        <img src="./../image/P11/seeyounextyear@2x.png" alt="" class="">
      </div>
      <div class="foot-warp">
        <button type="button" @click="$emit('changeComponent', 1)">点击抽取你的新年签</button>
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
            staticData: {
                type: '',
                default() {
                    return {};
                }
            }
        },
        created() {
            this.$emit('goAddAttention');
        }
    };
</script>
<style lang="less">
    @import './../less/11.less';
</style>
