<template>
    <div class="nine-page">
      <div class="content-zone">
        <div class="frame-warp">
          <div class="content">
            <p class="one">{{isSelf?'你':'TA'}}{{staticData[info]?staticData[info].title:'最喜欢听歌的时段是'}}</p>
            <p class="two" v-text="staticData[info]?staticData[info].time:''"></p>
            <p class="one" v-text="(staticData[info]?staticData[info].result:'').replace(/你/g, isSelf?'你':'TA')"></p>
          </div>
        </div>
        <div class="yxy-warp">
          <img src="./../image/P9/img@2x.png" class="yxy-img">
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
            info: '',
            staticData: {
                type: '',
                default() {
                    return {};
                }
            }
        }
    };
</script>
<style lang="less">
    @import './../less/9.less';
</style>
