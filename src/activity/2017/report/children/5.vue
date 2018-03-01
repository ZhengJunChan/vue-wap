
<template>
    <div class="five-page">
      <div class="img-warp">
        <img :src="infos.img|| ''" alt="">
      </div>
      <p class="title">{{isSelf?'你':'TA'}}最爱听的音乐类型是<span v-text="infos.type||''"></span></p>
      <div class="get-name-warp">
        <p class="one">
          恭喜{{isSelf?'你':'TA'}}获得称号</p>
        <p><span v-text="infos.name||''"></span></p>
      </div>
      <p class="text" v-html="infos.title" v-if="infos.title"></p>
      <p class="name" v-html="infos.text" v-if="infos.text"></p>
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
        },
        computed: {
            infos() {
                return this.staticData.typeInfo()[this.info];
            }
        }
    };
</script>
<style lang="less">
    @import './../less/5.less';
</style>
