<template>
    <div class="invite-friend-page" :style="{minHeight: oStyle.h + 'px'}">
      <!--<img src="./image/bg_yaoqiang@2x.png" class="bg-image">-->
      <div class="all-content">
        <div class="user-content">
          <div class="head" :style="info.head_link ? {'background-image':`url(${info.head_link+'/70/70'})`} :{}">

          </div>
          <p class="name" v-text="info.nickname">CindyLim</p>
           <p class="red-text">邀请您加入源音塘</p>
           <p class="line"></p>
           <p class="text">快来和TA一起分享<br>
             不一样的<br>
             二次元音乐吧</p>
        </div>

        <div class="active-content">
          <p class="main-title">
            百变心情，聆听二次元，<br>
            还可以参加有趣的线上活动哦！
          </p>
          <div class="input-zone" v-if="status">
            <input type="tel" class="tel-input" maxlength="11"
                   placeholder="輸入手机号码"
                   v-model="mobile">
            <button class="tel-button" type="button" @click="goRegFn(mobile, $event)"></button>
          </div>
          <div class="is-reg-zone" v-else>
            <div class="title">您已经成功注册啦~</div>
            <div class="bottom-warp">源音塘·音乐不止一种
            <span to="/" class="go-home" @click="goIndexPage">去看看 ></span></div>
          </div>
        </div>
      </div>
      <alert-component :data="{
      mobile: mobile,
      incode: info.mycode,
      reg_at:'wap_incode'
      }" :type="alertType"
                       v-if="typeList.indexOf(alertType)>=0"
                       v-model="status"
                       @closeAlert="closeAlert"/>
    </div>
</template>
<script type="text/javascript">
    import Ajax from './api.js';
    import alertComponent from './alert/index.vue';
    export default {
        data() {
            return {
                status: 1, // 是否需要注册
                alertType: '',
                info: {
                    mycode: ''
                },
                typeList: ['new', 'old', 'code'],
                mobile: '',
                buttonTime: ''
            };
        },
        components: {
            alertComponent
        },
        watch: {
            mobile(v, l) {
                if ((!/^1[2-9][0-9]{1,9}/.test(v) && v.length > 2) || (!/^1[2-9]$/.test(v) && v.length === 2) || (!/^1$/.test(v) && v.length === 1)) {
                    this.mobile = l;
                }
            }
        },
        computed: {
            oStyle() {
                return {
                    h: document.documentElement.offsetHeight,
                    w: document.documentElement.offsetWidth,
                    hw: document.documentElement.offsetHeight / document.documentElement.offsetWidth
                };
            }
        },
        methods: {
            eventBlurFn(e) {
                if (this.buttonTime) { window.clearTimeout(this.buttonTime); }
                this.buttonTime = setTimeout(() => {
                    e.target.blur();
                }, 1000);
            },
            goIndexPage() {
                this.$router.replace('/');
            },
            closeAlert(v) {
                this.alertType = Boolean(v) === true ? v : '';
            },
            getMusicianInfo() {
                let params = this.$route.query.code ? {
                    mycode: this.$route.query.code
                } : {};
                Ajax.getMusicianInfoByCode(params).then((res) => {
                    this.info = res.data || {mycode: ''};
                }).catch(() => {
                    this.$router.replace('/');
                    this.$toast && this.$toast.error && this.$toast.error('数据加载失败');
                });
            },
            goRegFn(v, e) {
                this.eventBlurFn(e);
                if (!(/^1[2-9][0-9]{9}/.test(v))) {
                    this.$toast && this.$toast.error && this.$toast.error('手机号码格式不正确');
                    return;
                }
                Ajax.checkCanUse({name: v}).then(() => {
                    this.alertType = 'code';
                }).catch((err) => {
                    if (err.code === 400) {
                        this.alertType = 'old';
                        return;
                    }
                    this.$toast && this.$toast.error && this.$toast.error(err.msg || '系统异常');
                });
            }
        },
        created() {
            this.getMusicianInfo();
        },
        beforeRouteEnter(t, f, n) {
            if (t.query.code) {
                window.m$ && window.m$.documentTitle && window.m$.documentTitle('邀请好友');
                n();
            } else {
                n(f);
            }
        }
    };
</script>
<style lang="less">
    @import 'index.less';
</style>
