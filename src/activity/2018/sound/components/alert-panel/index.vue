<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="alert_panel_component" v-show="isOpen">
        <div class="center_box">
            <header>
                <h2 class="title" v-html="title || '的金额外杜绝'"></h2>
                <div class="close_btn" v-show="showCloseBtn" @click="close" :style="{color: '#a8a8a8'}">
                    <i class="iconfont icon-close"></i>
                </div>
            </header>
            <div class="body">
                <div class="content_box" v-html="content" v-if="content"></div>
                <slot v-else></slot>
                <div class="btn_label">
                    <button class="sure_btn" v-text="btnText || '确定'" @click="sureClick"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

export default {
    props: {
        content: '',
        title: String,
        value: Boolean,
        btnText: String,
        showCloseBtn: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isOpen: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        close() {
            this.isOpen = false;
        },
        sureClick() {
            this.$emit('sureClick');
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
