<template>
    <div class="invite-alert">
      <div class="alert-content">
        <div class="head-warp">
          {{info.title}}
          <div class="img-warp" @click="$emit('closeAlert')"><img src="./../image/icon_close@2x.png"></div>
        </div>
        <div class="code-zone text-content" v-if="type=='code'">
            <div class="input-zone">
              <input type="tel" v-model="code" maxlength="4">
              <button type="button" v-if="!times" class="get-times" @click="getCodeFn">重新发送</button>
              <button type="button" v-else v-text="times+ 's'" class="times"></button>
            </div>
        </div>
        <div class="text-warp text-content" v-else v-html="info.text"></div>
        <div class="button-zone">
          <button type="button" v-text="info.button" @click="clickButtonFn"></button>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    import {config} from './index.js';
    import Ajax from './../api.js';
    import { RouterUtil } from '@/utils';
    export default {
        props: {
            data: '',
            type: '',
            value: ''
        },
        methods: {
            downloadApp() {
                RouterUtil.download(this.$router, Object.assign({}, this.$route, {name: 'home'}));
            },
            setCodeTimer() {
                if (this.timer) {
                    window.clearInterval(this.timer);
                    this.timer = '';
                }
                this.timer = setInterval(() => {
                    this.times--;
                    if (!this.times) {
                        window.clearInterval(this.timer);
                        this.timer = '';
                    }
                }, 1000);
            },
            getCodeFn() {
                Ajax.getMsmCode(this.data.mobile).then((res) => {
                    if (res.code === 200) {
                        this.times = 59;
                        this.setCodeTimer();
//                        this.$toast && this.$toast.error && this.$toast.error(res.data || '系统异常');
                    }
                }).catch((err) => {
                    this.$toast && this.$toast.error && this.$toast.error(err.msg || '系统异常');
                });
            },
            getSubmit() {
                Ajax.userRegister(Object.assign({code: this.code}, this.data)).then((res) => {
                    if (res.code === 200) {
                        this.$emit('closeAlert', 'new');
                        this.$emit('input', 0);
                    }
                }).catch((err) => {
                    this.$toast && this.$toast.error && this.$toast.error(err.msg || '系统异常');
                });
            },
            clickButtonFn() {
                switch (this.type) {
                case 'new' : this.downloadApp(); break;
                case 'old' : this.downloadApp(); break;
                case 'code' : this.getSubmit(); break;
                };
            }
        },
        data() {
            return {
                code: '',
                times: 0,
                timer: ''
            };
        },
        watch: {
            code(v, l) {
                if (!/^\d{1,4}$/.test(v) && v.length) {
                    this.code = l;
                }
            }
        },
        computed: {
            info() {
                return config[this.type];
            }
        },
        created() {
            this.type === 'code' && this.getCodeFn();
        }
    };
</script>
<style lang="less" scoped>
    @import 'index.less';
</style>
