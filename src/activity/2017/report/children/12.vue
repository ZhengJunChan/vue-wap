<template>
    <div class="page-12">
      <div class="content" :class="{'small-content': (screenHw.h/screenHw.w)<=1.5}">
        <p class="new-title">2018 新年签</p>
        <div class="zone">
          <div class="text-warp">
            <p class="one" v-html="staticData.text[type].one">荷包满满</p>
            <p class="one" v-html="staticData.text[type].two">发财签助你</p>
            <p class="one" v-html="staticData.text[type].three">钱钱钱很爱速来</p>
            <p class="two" v-html="staticData.text[type].four">发财</p>
            <p class="three" v-html="staticData.text[type].five">fa<br>cai</p>
          </div>
          <div class="code-img" :class="{'is-five':type>3&&type<7,'is-long':type>=7}">
            <img src="./../image/P12/img_code.jpg" alt="">
          </div>
        </div>

        <div class="submit-button">
          <button type="button"
                  class="button"
                  @click="goNext(isSelf)"
                  v-text="isSelf?'分享给好友':'查看我的源音塘专属年报'"></button>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    import { RouterUtil } from '@/utils';
    export default {
        props: {
            screenHw: '',
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
        computed: {
            type() {
                return parseInt(Math.random() * this.staticData.text.length);
            }
        },
        methods: {
            goNext(o) {
//                this.$router.replace('/');
                if (o) {
                    this.callAppFunction('showShareWindow', { funcName: 'showShareWindow' });
                } else {
                    RouterUtil.download(this.$router, this.$route);
                }
            }
        }
    };
</script>
<style lang="less">
    @import './../less/12.less';
</style>
