<template>
  <div class="bind_mobile_page">
  	<div class="header_box">
  		<header-img :size="140" :header-img="user.header" no-compress></header-img>
  		<p>亲爱的{{user.name}}</p>
  		<p>为了更好的活动体验，需要绑定手机哦</p>
  	</div>
  	<div>
  		<div class="input_bar accout clear_float">
            <span class="fl">手机号：</span>
            <input class="fl" type="tel" v-model="accout.val" placeholder="请输入手机号" autofocus maxlength="11">
        </div>
        <div class="input_bar code clear_float">
            <span class="fl">验证码：</span>
            <input class="fl" type="tel" v-model="code.val" placeholder="请输入验证码" autofocus maxlength="4">
            <button type="button" class="get-code btn"
            @click="sendCode"
            v-text="code.tip"></button>
        </div>

        <div class="btn bind_btn" @click="bind">绑定手机</div>
  	</div>

  </div>
</template>

<script type="text/javascript">

import { RegularUtil } from '@/utils';
import CommonApi from './../common-api.js';

import { HeaderImg } from '@/components';

export default {
    components: {
        HeaderImg
    },
    data() {
        return {
            user: {
                sex: '',
                name: '',
                type: '',
                header: '',
                openId: this.$route.query.openid
            },
            accout: {
                val: '',
                error: ''
            },
            code: {
                val: '',
                error: '',
                sending: false,
                tip: '获取验证码'
            },
            iswx: false,
            dataTest: ''
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.openidLogin();
            this.getUserInfo();
        },
        openidLogin() {
            let params = {
                type: 1,
                openid: this.user.openId
            };

            if (!this.user.openId) {
                this.$toast.error('openid参数错误，请联系管理员！');
                return;
            };

            CommonApi.openidLogin(params).then(res => {
                if (res.code === 200) {
                    this.$store.dispatch('setUserInfo', res.data);
                }
            });
        },
        getUserInfo() {
            let params = {
                openid: this.user.openId
            };

            CommonApi.getThirdUserInfo(params).then((res) => {
                if (res.code === 200) {
                    this.user.sex = res.data.sex;
                    this.user.name = res.data.nickname;
                    this.user.type = res.data.type;
                    this.user.header = res.data.head_link;
                }
            });
        },
        sendCode() {
            let params = {
                key: this.accout.val,
                type: 'addbind'
            };

            if (this.code.sending) {
                return;
            }

            this.checkAccount(() => {
                this.setTimer();

                CommonApi.sendCodeForBind(params).then(res => {
                    if (res.code !== 200) {
                        this.accout.error = res.msg;
                    }
                }, error => {
                    this.accout.error = error.msg;
                });
            });
        },
        setTimer() {
            let time = 59;

            this.code.sending = true;
            this.code.tip = time + 's';

            let timer = setInterval(() => {
                time--;
                this.code.tip = time + 's';

                if (time === 0) {
                    clearInterval(timer);
                    this.code.tip = '重新发送';
                    this.code.sending = false;
                }
            }, 1000);
        },
        bind() {
            var params = {
                key: this.accout.val,
                code: this.code.val
            };

            if (this.logining) {
                this.$toast.error('绑定中...');
                return;
            }

            this.logining = true;

            this.checkAccount(() => {
                if (!this.code.val) {
                    this.$toast.error('验证码不能为空');
                    return;
                }

                CommonApi.bindMobile(params).then(res => {
                    this.submitCallback(res);
                }, error => {
                    this.logining = false;
                    this.$toast.error(error.msg);
                });
            });
        },
        checkAccount(successFun) {
            this.accout.error = false;

            if (!this.accout.val) {
                this.$toast.error('手机号不能为空');
                this.accout.error = true;
                return;
            }

            if (!RegularUtil.isMobile(this.accout.val)) {
                this.$toast.error('手机号格式不正确');
                this.accout.error = true;
                return;
            }

            let params = {
                name: this.accout.val,
                type: this.user.type,
                openid: this.$route.query.openid
            };

            CommonApi.checkThirdAccount(params).then((res) => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    this.accout.error = true;
                    return;
                }

                successFun && successFun();
            }, error => {
                this.$toast.error(error.msg);
                this.accout.error = true;
            });
        },
        checkCode(successFun) {
            if (!this.code.val) {
                this.$toast.error('验证码不能为空');
                return;
            }
        },
        submitCallback(res) {
            this.logining = false;

            if (res.code !== 200) {
                this.$toast.error(res.msg);
                return;
            }

            let returnUrl = this.$route.query.returnUrl;

            if (!returnUrl) {
                this.$toast.error('找不到上一个页面');
            }

            window.location.replace(returnUrl);
        }
    }
};
</script>

<style lang="less" scoped>
@import './bind-mobile.less';
</style>
