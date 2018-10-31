<template>
  <div class="address_page" :style="{minHeight: pageMinHeight}">
    <p class="header_tip">为保证寄送安全，无法支持修改地址，请正确填写哦</p>

    <div class="last_addr" v-if="lastAddr.uname" :class="{gray: !lastAddr.isSelect}" @click="selecteLastAddr">
        <div class="selected"></div>
        <div>
            <p>
                <span class="name" v-text="lastAddr.uname"></span>
                <span class="mobile fr" v-text="lastAddr.mobile"></span>
            </p>
            <p v-text="lastAddr.addr"></p>
        </div>
    </div>

    <div @click="selectedInput">
        <group class="yyt_form" :class="{gray: lastAddr.isSelect && lastAddr.uname}">
           <x-input title="收件人" v-model="name" placeholder="请输入收件人真实姓名" novalidate required></x-input>

           <x-input title="收件电话" mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入收件人手机号" required></x-input>

           <x-address raw-value hide-district
           value-text-align="left" title="省市" placeholder="所在地区"
           v-model="provinceAndCity" :list="addressData" required></x-address>

           <x-textarea title="详细地址" v-model="addressDetail" placeholder="请输入详细收件地址"  :show-counter="false" :rows="1" autosize required></x-textarea>
        </group>
    </div>

    <p class="tip">奖品将在活动结束后5个工作日内发放，比心</p>

    <div class="submit_label">
        <x-button class="submit_btn" :class="{disabled: disabled}" type="warn" :show-loading="submiting" :disabled="disabled" @click.native="submit">提交</x-button>
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
            addressDetail: '', // 地址详情
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
            },
            lastAddr: {
                isSelect: true,
                isShow: false,
                uname: '',
                mobile: '',
                addr: '',
                mobile_text: ''
            }
        };
    },
    computed: {
        fixMobile() {
            return this.mobile.split(' ').join('');
        },
        disabled() {
            let isDisabled = false;

            if (this.lastAddr.isSelect && this.lastAddr.uname) {
                return isDisabled;
            }

            if (this.submiting || !this.name || !RegularUtil.isMobile(this.fixMobile) || !this.provinceAndCity.length || !this.addressDetail) {
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
    created() {
        if (BrowserUtil.isFromAndroidApp()) {
            this.pageMinHeight = window.screen.height - 20 + 'px';
        }

        this.getLastAddr();
    },
    methods: {
        getLastAddr() {
            AddrApi.getLastAddr().then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.lastAddr.uname = res.data.uname;
                this.lastAddr.mobile = res.data.mobile;
                this.lastAddr.addr = res.data.addr;
                this.lastAddr.mobile_text = res.data.mobile_text;
            });
        },
        submit() {
            let params = {
                id: this.$route.query.prizeId
            };

            if (this.lastAddr.isSelect && this.lastAddr.uname) {
                params.uname = this.lastAddr.uname;
                params.mobile = this.lastAddr.mobile_text;
                params.addr = this.lastAddr.addr;
            } else {
                params.uname = this.name;
                params.mobile = this.fixMobile;
                params.addr = this.fixProvinceAndCity(this.provinceAndCity) + '' + this.addressDetail;
            }

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
        },
        selectedInput() {
            if (!this.lastAddr.uname) {
                return;
            }

            this.lastAddr.isSelect = false;
        },
        selecteLastAddr() {
            if (!this.lastAddr.uname) {
                return;
            }

            this.lastAddr.isSelect = true;
        }
    }
};
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>

