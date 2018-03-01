<template>
  <div class="sell_page">
  	<img src="./../../imgs/concert.jpg" class="bg_img">
  	<div class="btn_label">
  		<div>
        <a class="prize_btn fl" @click="goProze"></a>
	   		<a class="sell_btn fr" href="https://item.taobao.com/item.htm?id=560680094175" target="_blank"></a>
  		</div>
  	</div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>

<script type="text/javascript">
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    methods: {
        goProze() {
            if (BrowserUtil.isFormApp()) {
                let param = {
                    url: `${window.location.origin}/ciyuan2017/prize`,
                    title: '次元音乐会',
                    headerType: 'share'
                };

                this.callAppFunction('go', param);
            } else {
                RouterUtil.go('/ciyuan2017/prize', this.$router);
            }
        }
    }
};
</script>
