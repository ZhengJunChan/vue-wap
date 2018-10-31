<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="login_alert_component">
        <header class="header">
            <h2 class="title" v-html="title || '手机登录'"></h2>
            <div class="close_btn" @click="close" :style="{color: '#a8a8a8'}">
                <i class="iconfont icon-close"></i>
            </div>
        </header>
        <div class="form_box">
            <div class="mobile_box">
                <x-input class="tel_number" mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="输入手机号码" required placeholder-align="left" text-align="left" :show-clear="false"></x-input>
            </div>

            <!-- <group class="mobile_box">
                <x-input mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="输入手机号码" required placeholder-align="left" text-align="left" :show-clear="false"></x-input>
            </group> -->

            <div class="code">
                <input type="tel" class="text" v-model="code.val" placeholder="输入验证码">
                <button class="timer" :class="!code.sending && 'resend'" v-text="code.tip" @click="sendCode"></button>
            </div>

            <footer>
                <button v-text="btnText || '登录'" @click="submit"></button>
            </footer>
        </div>
    </div>
</template>

<script type="text/javascript">
import { UserApi } from '@/api';
import { XInput, Group } from 'vux';
import { BrowserUtil } from '@/utils';

export default {
    components: {
        Group,
        XInput
    },
    props: {
        options: Object,
        title: String,
        value: Boolean,
        btnText: String
    },
    data() {
        return {
            type: {
                active: 'login',
                login: 'login',
                sendCode: 'send-code'
            },
            mobile: '',
            code: {
                val: '',
                error: '',
                sending: false,
                tip: '获取验证码'
            }
        };
    },
    computed: {
        isOpen: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        fixMobile() {
            return this.mobile.split(' ').join('');
        }
    },
    methods: {
        close() {
            this.$store.dispatch('close');
            this.reset();
        },
        reset() {
            this.mobile = '';
            this.code.val = '';
            this.clearTimer();
            this.type.active = this.type.login;
        },
        submit() {
            if (this.type.active === this.type.login) {
                this.sendCode();
            }

            if (this.type.active === this.type.sendCode) {
                this.login();
            }
        },
        // 发送验证码
        sendCode() {
            if (!this.fixMobile || this.code.sending) {
                return;
            }

            this.setTimer();

            this.checkSendCode().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }
                // alert(res.data);

                this.type.active = this.type.sendCode;
            }, error => {
                this.clearTimer();
                this.$toast.error(error.msg);
            });
        },
        // 根据不同环境进行不同请求
        checkSendCode() {
            let params = null;
            let sendPrimse = null;

            if (BrowserUtil.isFormWeiXin()) {
                params = {
                    key: this.fixMobile,
                    type: 'addbind'
                };

                sendPrimse = UserApi.sendCodeForBind(params);
            } else {
                params = {
                    name: this.fixMobile,
                    type: 'fast_log'
                };

                sendPrimse = UserApi.sendCode(params);
            }

            return sendPrimse;
        },
        setTimer() {
            let time = 59;

            this.code.sending = true;
            this.code.tip = time + 's';

            this.timer = setInterval(() => {
                time--;
                this.code.tip = time + 's';

                if (time === 0) {
                    this.clearTimer();
                }
            }, 1000);
        },
        clearTimer() {
            this.code.sending = false;
            this.code.tip = '重新发送';
            clearInterval(this.timer);
        },
        login() {
            if (!this.code.val) {
                return;
            }

            this.checkLogin().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                !BrowserUtil.isFormWeiXin() && this.$store.dispatch('setUserInfo', res.data);
                this.clearTimer();
                this.close();
                this.$emit('login-success');
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        checkLogin() {
            let params = null;
            let loginPrimse = null;

            if (BrowserUtil.isFormWeiXin()) {
                params = {
                    key: this.fixMobile,
                    code: this.code.val
                };

                loginPrimse = UserApi.bindMobile(params);
            } else {
                params = {
                    mobile: this.fixMobile,
                    reg_at: 'wap',
                    thirdcode: this.code.val
                };

                if (this.options && this.options.reg_from) {
                    params.reg_from = this.options.reg_from;
                }

                loginPrimse = UserApi.fastLogin(params);
            }

            return loginPrimse;
        }
    }
};
</script>
<style lang="less" scoped>
    @import './main.less';
</style>
