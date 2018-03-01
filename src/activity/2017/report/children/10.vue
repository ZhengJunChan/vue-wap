
<template>
    <div class="ten-page">
      <div class="content-zone">
        <p class="title-text">
          和{{isSelf?'你':'TA'}}听歌属性最相似的小天使有
        </p>
        <div class="group-warp">
          <div class="person-item" v-for="(oitem,oindex) in info" :key="oindex">
            <div class="head-warp" :style="{'backgroundImage': `url(${oitem.head_link?oitem.head_link+'/70/70':''})`}">
              <img src="./../image/P10/icon_index_v@2x.png" v-if="oitem.is_music===3">
            </div>
            <div class="name-warp">
              <span class="name" v-text="oitem.nickname||''">kizuna工作室</span>
              <span class="sex-button" :class="{'blue':oitem&&oitem.sex==1}">
                <img src="./../image/P10/nan.png" v-if="oitem&&oitem.sex==1">
                <img src="./../image/P10/lv.png" v-else>
                <span v-text="oitem.day||18">1223</span>
              </span>
            </div>
          </div>
        </div>

        <p class="one"><span>新的旅程</span>从勾搭开始</p>
        <p class="two">快来<span>认识</span>他们吧~</p>
        <label class="check-box">
          <div class="check-warp com-div-middle-ab">
            <input type="checkbox" v-model="isAgree" :value="1">
            <img src="./../image/P10/icon_cancel@2x.png" v-if="isAgree.length==0">
            <img src="./../image/P10/icon_check@2x.png" v-else>
          </div>
          同时关注TA们
        </label>
        <div class="yxy-warp">
          <img src="./../image/P10/img@2x.png" alt="">
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
            value: '',
            staticData: {
                type: '',
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                isAgree: this.value
            };
        },
        watch: {
            value(v) {
                this.isAgree = v;
            },
            isAgree(v) {
                this.$emit('input', v);
            }
        }
    };
</script>
<style lang="less">
    @import './../less/10.less';
</style>
