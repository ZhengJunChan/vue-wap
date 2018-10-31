<template>
  <div class="address_page" :style="{minHeight: pageMinHeight}">
        <group class="yyt_form">
           <x-input title="姓名" v-model="name" placeholder="请输入收件人真实姓名" novalidate required></x-input>

           <x-input title="电话号码" mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入收件人手机号" required></x-input>
        </group>

        <group class="yyt_form">
           <x-input title="领取账号" type="number" v-model="qq" placeholder="请输入收件人QQ" novalidate required></x-input>

           <x-address raw-value hide-district
           value-text-align="left" title="省市" placeholder="所在地区"
           v-model="provinceAndCity" :list="addressData" required></x-address>
        </group>

        <p class="tip">奖品将在活动结束后5个工作日内发放，比心</p>

        <div class="submit_label">
            <x-button class="submit_btn" :class="{disabled: disabled}" type="warn" :show-loading="submiting" :disabled="disabled" @click.native="submit">提交</x-button>
            <!-- <x-button type="warn" :show-loading="submiting" @click.native="submit">提交</x-button> -->
        </div>
  </div>
</template>

<script type="text/javascript">
import AddrApi from './addr-api.js';
import { RegularUtil, RouterUtil, BrowserUtil } from '@/utils';
import { Group, XInput, XAddress, ChinaAddressV4Data, XTextarea, XButton, Value2nameFilter as value2name } from 'vux';

export default {
    components: {
        Group,
        XInput,
        XAddress,
        XTextarea,
        XButton
    },
    data() {
        return {
            submiting: false,
            name: '',  // 收件人
            mobile: '',  // 电话号码
            qq: '',
            provinceAndCity: [],
            addressData: ChinaAddressV4Data,
            pageMinHeight: '100vh',
            backAlert: {
                api: 'setGoBackStatus',
                params: {
                    show: false,
                    title: '',
                    content: '离开后，已填写内容不再保存',
                    sureBtnText: '确定',
                    cancelBtnText: '取消'
                }
            }
        };
    },
    computed: {
        fixMobile() {
            return this.mobile.split(' ').join('');
        },
        disabled() {
            let isDisabled = false;

            if (this.submiting || !this.name || !RegularUtil.isMobile(this.fixMobile) || !this.provinceAndCity.length || !this.qq) {
                isDisabled = true;
            }

            return isDisabled;
        }
    },
    watch: {
        name(val) {
            if (val) {
                this.backAlert.params.show = true;
            } else {
                this.backAlert.params.show = false;
            }

            this.callAppFunction(this.backAlert.api, this.backAlert.params);
        }
    },
    mounted() {
        if (BrowserUtil.isFromAndroidApp()) {
            this.pageMinHeight = window.screen.height - 20 + 'px';
        }
    },
    methods: {
        submit() {
            let params = {
                uname: this.name,
                qq: this.qq,
                mobile: this.fixMobile,
                id: this.$route.query.prizeId,
                addr: this.fixProvinceAndCity(this.provinceAndCity)
            };

            this.submiting = true;

            AddrApi.acceptPrize(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    this.submiting = false;
                    return;
                }
                this.$toast.success('提交成功，工作人员将及时与您联系');

                this.goback();
            }, error => {
                this.submiting = false;
                this.$toast.error(error.msg);
            });
        },
        fixProvinceAndCity(value) {
            return value2name(value, ChinaAddressV4Data);
        },
        goback() {
            let params = {
                headerType: 'share',
                activity: 'activity',
                url: window.location.origin + this.$route.query.url
            };

            RouterUtil.goBack(this, params, true);
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>

<style type="text/css" lang="less">
.address_page .last_addr{
  .gray { 
    *{
        color: #9da6a4 !important;
    }
    input{
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color: #9da6a4;
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
           color: #9da6a4;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
           color: #9da6a4;
        }
        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
           color: #9da6a4;
        }
    }
  }
}
</style>

