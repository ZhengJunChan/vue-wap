<template>
  <div class="fast_login_page">
    <div class="main">
      	<p class="welcome">欢迎来到源音塘音乐世界</p>

        <div class="content">
            <group class="yyt_form">
               <x-input title="手机号" type="tel" mask="999 9999 9999" v-model="mobile" :max="13" placeholder="请输入手机号码"></x-input>
            </group>

            <div class="bind_btn" @click="checkAccount">验证手机</div>
      	</div>

        <!-- <p class="bottom">登录表示同意用户协议和版权政策</p> -->
        <p class="bottom">登录表示同意<span @click="showUserProtocol('agreement')">用户协议</span>和<span @click="showUserProtocol('copyrightpolicy')">版权政策</span></p>
    </div>

    <!--   /  抽奖弹框  -->
    <alert-panel :title="protocol.title"  v-model="protocol.show" :content="protocol.content" :sure-btn="protocol.sureBtn">
    </alert-panel>

    <!--   /  抽奖弹框  -->
    <alert-panel title="输入验证码"  v-model="panel.isOpen" :content="panel.content" @sureClick="submit">
        <div class="verification_code">
            <input class="fl" type="tel" v-model="code.val" maxlength="4">
            <button type="button" class="btn fr"
            :class="time && 'sending'"
            @click="sendCode"
            v-text="code.tip"></button>
        </div>
    </alert-panel>
  </div>
</template>

<script type="text/javascript">

import { RegularUtil, RouterUtil } from '@/utils';
import CommonApi from './../common-api.js';

import { AlertPanel } from '@/components';
import { Group, XInput } from 'vux';

export default {
    components: {
        Group,
        XInput,
        AlertPanel
    },
    data() {
        return {
            mobile: '',
            account: '',
            code: {
                val: '',
                error: '',
                sending: false,
                tip: '重新发送'
            },
            panel: {
                isOpen: false,
                headerImg: '',
                headerColor: '',
                title: '',
                content: '',
                btnText: '',
                btnUrl: '',
                closeColr: '',
                btnClicked() {}
            },
            protocol: {
                show: false,
                title: '',
                content: '',
                sureBtn: {
                    show: false
                }
            },
            time: 0,
            timer: null,
            logining: false
        };
    },
    watch: {
        account() {
            if (this.code.sending) {
                this.clearTimer();
            }
        }
    },
    methods: {
        checkAccount() {
            if (!this.mobile) {
                this.$toast.error('手机号不能为空');
                return;
            }

            this.account = this.mobile.split(' ').join('');

            if (!RegularUtil.isMobile(this.account)) {
                this.$toast.error('手机号格式不正确');
                return;
            }

            setTimeout(() => {
                this.panel.isOpen = true;
                this.sendCode();
            }, 300);
        },
        sendCode() {
            let params = {
                name: this.account,
                type: 'sms'
            };

            if (this.code.sending) {
                return;
            }

            this.setTimer();

            CommonApi.sendCode(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                }

                this.$toast.error(`验证码：${res.data}`);
            }, error => {
                this.$toast.error(error.msg);
            });
        },
        setTimer() {
            this.time = 60;

            this.code.sending = true;
            this.code.tip = this.time + 's';

            this.timer = setInterval(() => {
                this.time--;
                this.code.tip = this.time + 's';

                if (this.time === 0) {
                    this.clearTimer();
                }
            }, 1000);
        },
        clearTimer() {
            clearInterval(this.timer);
            this.code.tip = '重新发送';
            this.code.sending = false;
        },
        submit() {
            if (!this.code.val) {
                this.$toast.error('验证码不能为空');
                return;
            }

            if (this.logining) {
                return;
            }

            let params = {
                mobile: this.account,
                thirdcode: this.code.val,
                reg_at: 'wap'
            };

            this.logining = false;

            CommonApi.fastLogin(params).then(res => {
                let url = '';
                this.logining = false;

                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                url = decodeURIComponent(this.$route.query.url);

                RouterUtil.go(url, this.$router);
            }, error => {
                this.logining = false;
                this.$toast.error(error.msg);
            });
        },
        showUserProtocol(protocolName) {
            let params = {
                code: protocolName
            };

            CommonApi.getDocument(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.protocol.show = true;
                this.protocol.title = res.data.title;
                this.protocol.content = res.data.content;
            }, error => {
                this.$toast.error(error.msg);
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>

<style lang="less">
.fast_login_page{
    .weui-cells{
        margin-top: 0;
    }
    .weui-cell{
        padding: 16px 15px;
    }
    .weui-cell__bd{
        height: 100%;
        font-size: 28/100rem;
    }
    .vux-x-input{
        background: url(./imgs/tel.png) 10px center no-repeat;
        background-size: 30/100rem 30/100rem;
    }
}
</style>
