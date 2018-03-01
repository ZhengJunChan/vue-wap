<template>
  <div class="address_page" :style="{minHeight: pageMinHeight}">
        <group class="yyt_form">
           <x-input title="收件人" v-model="name" placeholder="请输入收件人真实姓名" novalidate required></x-input>

           <x-input title="手机号码" mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入收件人手机号" required></x-input>
        </group>

        <group class="yyt_form">
           <x-input title="QQ" type="number" v-model="qq" placeholder="请输入收件人QQ" novalidate v-if="!isHideQQ" required></x-input>

           <x-address raw-value hide-district
           value-text-align="left" title="省市" placeholder="所在地区"
           v-model="provinceAndCity" :list="addressData" required></x-address>

           <x-textarea title="详细地址" v-model="addressDetail" placeholder="请输入详细收件地址"  :show-counter="false" :rows="1" autosize v-if="!isHideAddressDetail" required></x-textarea>
        </group>

        <p class="tip">地址提交成功后，工作人员将24h内与您联系</p>

        <div class="submit_label">
            <x-button type="warn" :show-loading="submiting" :disabled="disabled" @click.native="submit">提交</x-button>
            <!-- <x-button type="warn" :show-loading="submiting" @click.native="submit">提交</x-button> -->
        </div>
  </div>
</template>

<script type="text/javascript">
import CommonApi from './../common.js';
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
            isHideQQ: this.$route.query.addr === 'material',
            isHideAddressDetail: this.$route.query.addr === 'virtual',
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
            }
        };
    },
    computed: {
        fixMobile() {
            return this.mobile.split(' ').join('');
        },
        disabled() {
            let isDisabled = false;

            if (this.submiting || !this.name || !RegularUtil.isMobile(this.fixMobile) || !this.provinceAndCity.length) {
                isDisabled = true;
            }

            if (this.$route.query.addr === 'material' && !this.addressDetail) {
                isDisabled = true;
            }

            if (this.$route.query.addr === 'virtual' && !this.qq) {
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
                mobile: this.fixMobile
            };

            this.submiting = true;

            if (this.$route.query.addr === 'material') {
                params.addr = this.fixProvinceAndCity(this.provinceAndCity) + '' + this.addressDetail;
            }

            if (this.$route.query.addr === 'virtual') {
                params.qq = this.qq;
                params.addr = this.fixProvinceAndCity(this.provinceAndCity);
            }

            CommonApi.acceptPrize(this.$route.query.prizeId, params).then(res => {
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
