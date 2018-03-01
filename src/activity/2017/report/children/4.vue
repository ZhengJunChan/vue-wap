<template>
    <div class="four-page" v-if="showLength">
     <div class="head-title-zone">
       <svg :viewBox="`0, 0, 110, 70`" class="love-warp"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       >
         <g fill="none" fill-rule="evenodd">
           <image xlink:href="./../image/P4/icon_peach@2x.png"
                  width="0" height="0" x="85" y="57">
             <animate attributeName="x" begin="0s" values="85;35" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="y" begin="0s" values="57;7" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="opacity" begin="0s" values="0;1;1;0" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="width" begin="0s" values="0;25;30" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="height" begin="0s" values="0;13;15" dur="2s"
                      repeatCount="indefinite"></animate>
           </image>
           <image xlink:href="./../image/P4/icon_peach@2x.png"
                  width="0" height="0" x="85" y="57">
             <animate attributeName="x" begin="-1s" values="85;35" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="y" begin="-1s" values="57;7" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="opacity" begin="-1s" values="0;1;1;0" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="width" begin="-1s" values="0;25;30" dur="2s"
                      repeatCount="indefinite"></animate>
             <animate attributeName="height" begin="- 1s" values="0;13;15" dur="2s"
                      repeatCount="indefinite"></animate>
           </image>
         </g>
       </svg>
       <p>这一年{{isSelf?'你':'TA'}}最爱听的</p>
       <img src="./../image/P4/img_top@2x.png" class="top10" v-if="showLength == 10">
       <img src="./../image/P4/img_top5@2x.png" class="top10" v-if="showLength == 5">
     </div>
    <div class="content-zone">
     <transition-group tag="ul" class="list-warp" name="fade" appear :class="{'is-top5': showLength==5}">
        <li v-for="(oitem, oindex) in info" :key="oindex"
            class="list-item tne"
            :class="'color-list'+oindex" v-if="oindex < showLength"
            v-text="`${oindex+1}、${oitem.title}`"></li>
     </transition-group>
    </div>
    </div>
    <div class="four-page-little-song" v-else>
      <div class="content-zone">
        <div class="head-warp" :style="{'backgroundImage': `url(${info[0].imgpic_link?info[0].imgpic_link+'/160/160':''})`}">

        </div>
        <div class="text-warp">
          <div class="title">这一年{{isSelf?'你':'TA'}}最喜欢的一首歌是
          <div class="img-warp">
            <img src="./../image/P4/icon_peach@2x.png" class="one">
            <img src="./../image/P4/icon_peach_little@2x.png" class="two">
          </div>
          </div>
          <p class="name" v-text="info[0].title">【原创】洛天依 温柔人间</p>
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
        computed: {
            showLength() {
                return this.info.length >= 10 ? 10 : this.info.length >= 5 && this.info.length < 10 ? 5 : 0;
            }
        }
    };
</script>
<style lang="less">
    @import './../less/4.less';
</style>
