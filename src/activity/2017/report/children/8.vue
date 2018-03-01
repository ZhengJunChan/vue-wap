<template>
    <div class="eight-page">
      <div class="content">
        <img src="./../image/P8/bng.png" alt="" class="bg-img">
        <div class="list">
          <p>这一年</p>
          <p>{{isSelf?'你':'TA'}}发出了<span v-text="info.comment_count||0">2333</span>个赞与评论</p>
          <p>关注了<span v-text="info.attention||0">233</span>个好友</p>
          <p>获得了<span v-text="info.to_comment_count||0">668</span>个赞与评论</p>
          <p>获得了<span v-text="info.fans||0">6879</span>位粉丝</p>
          <p>莫愁前路无知己 </p>
          <p>天下谁人不识君</p>
        </div>
      </div>
      <div class="yxy-warp">
        <div>
          <img src="./../image/P8/xin.png" class="love-img">
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
        }
    };
</script>
<style lang="less">
    @import './../less/8.less';
</style>
