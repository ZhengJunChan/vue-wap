<template>
    <div class="gather-prize-page" :class="{'is-in-app':inAppWeChat}">
      <div class="gather-prize-main-zone">
        <transition>
          <component :is="`prize${compType}`"
                     :isFromApp="isFromApp"
                     :pageType = "compType"
                     :info = "info"
                     :ticket = "ticket?true:false"
                     class="gather-prize-content"
          />
        </transition>
      </div>
      <img src="./img/bg_newyear_bottom.png" class="footer">
    </div>
</template>
<script type="text/javascript">
    import { BrowserUtil } from '@/utils';
    import children from './children.js';
    import Ajax from './Api.js';
    var types = ['bless', 'ticket', 'sound', 'error', 'coin', 'init'];
    export default {
        data() {
            return {
                isGotData: false,
                isFromApp: BrowserUtil.isFormApp(),
                info: {
                    type: 'init'
                }
            };
        },
        components: children.getPonents('prize', types),
        computed: {
            inAppWeChat() {
                return BrowserUtil.isFormApp() || BrowserUtil.isFormWeiXin();
            },
            compType() {
                let ids = children.prizeType;
                let type = ids[this.info.type] ? ids[this.info.type] : 'error';
                children.setTitle(BrowserUtil, children.prizePageTitle[type]);
                return type;
            },
            ticket() {
                let id = this.$route.query.ticket || 0;
                return id;
            },
            prize() {
                let id = this.$route.query.prize || 0;
                return id;
            }
        },
        methods: {
            setPageType(t) {
                this.info = Object.assign({}, this.info || {}, {
                    type: t || 'ty'
                });
            },
            setShareFn() {
                this.$share({
                    alias: '2018chinayear ',
                    type: 5,
                    title: '神兽做护法，源音塘新年豪奖开抢啦！', // 分享标题
                    link: window.location.origin + '/activity/2018_ji_fu', // 分享链接
                    imgUrl: window.location.origin + '/static/imgs/activity/2018/gather/img_newyear_share.jpg', // 分享图标
                    desc: '传说中的男神女神蜜汁语音条正在等你点开哦'
                });
            },
            closeLotteryDialog() {
                this.callAppFunction('closeLotteryDialog', {});
            },
            getGether2018Data() {
                if (!this.ticket && !this.prize) {
                    this.setPageType();
                    return;
                }
                let ways = this.ticket ? 'setGether2018Data' : 'getGether2018Data';
                let params = this.ticket ? {chance_id: this.ticket} : {win_id: this.prize};
                Ajax[ways](params).then((res) => {
                    this.info = res.data.type ? res.data : {};
                    this.closeLotteryDialog();
                    if (this.ticket) {
                        this.$router.replace({
                            name: this.$route.name,
                            query: {
                                prize: res.data.win_id ? res.data.win_id : ''
                            }
                        });
                    }
                }).catch((e) => {
//                    this.$toast.error(JSON.stringify(e));
                    this.setPageType();
                });
            }
        },
        created() {
            document.body.ontouchmove = function (e) {
                e = e || window.event;
                e.preventDefault();
                return;
            };
            this.setShareFn();
            this.getGether2018Data();
        },
        beforeDestroy() {
            document.body.ontouchmove = null;
        }
    };
</script>
<style lang="less">
  @import "index.less";
</style>
