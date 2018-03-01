<template>
    <div class="one-page">
      <div class="content-zone">
        <div class="music-img-warp">
          <img src="./../image/P1/icon.png" class="one">
          <img src="./../image/P1/l.png" class="two">
        </div>
         <p v-if="isLoading<100||isLoading==='login'">
           让<span>音乐</span>成为我们的<span>战歌</span>吧
         </p>
        <p v-else v-text="info">

        </p>
        <img src="./../image/P1/bgn.png" class="content-img">
        <img src="./../image/P1/icon_peach@2x.png" alt="" class="love-img">
      </div>
      <div class="is-loading-data"
           v-if="typeof isLoading === 'number'&&isLoading<100"
           v-text="`${isLoading}%`"></div>
      <div class="fail-warp" v-else-if="typeof isLoading !== 'number'&&isLoading!=='login'">
        <span @click="$emit('reloadDataFn')">加载失败...</span><br>
        <span class="small" @click="$emit('reloadDataFn')">(重新加载)</span>
      </div>
      <div class="fail-warp" v-else-if="typeof isLoading !== 'number'&&isLoading==='login'">
        <span @click="goLogin">尚未登陆</span><br>
        <span class="small" @click="goLogin">(立即登录)</span>
      </div>
      <div class="title-warp" v-else>
        <img src="./../image/P1/img_gift@2x.png" class="gift-img">
        <span>末尾有惊喜哦</span>
      </div>

    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            isSelf: '',
            info: '',
            isLoading: ''
        },
        methods: {
            goLogin() {
                let param = { funcName: 'gotoLogin' };
                this.callAppFunction('gotoLogin', param);
            }
        }
    };
</script>
<style lang="less">
    @import './../less/1.less';
</style>
