<template>
  <div class="empty_tip_component">
    <div :style="{backgroundImage: `url(${icons.singerDetail})`}">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import icons from './icons.js';
export default {
    props: {
        size: [Number],
        headerImg: String,
        noCompress: Boolean,
        borderColor: String,
        vip: [Boolean, Number],
        headerId: [Boolean, Number]
    },
    data() {
        return {
            icons
        };
    },
    methods: {
        setBoxStyle() {
            let style = {
                padding: this.size / 200 + 'rem',
                backgroundImage: this.headerImg || ''
            };

            if (!this.noCompress) {
                style.backgroundImage && (style.backgroundImage += `/${this.size}/${this.size}`);
            }

            if (this.borderColor) {
                style.border = '2px solid ' + this.borderColor;
            }

            return {
                padding: style.padding,
                backgroundImage: `url(${style.backgroundImage})`
            };
        },
        setVipStyle() {
            let right = 0;

            if (this.size > 100) {
                right = this.size * 0.02;
            } else {
                right = 0 - this.size * 0.12;
            }

            return {
                right: right / 100 + 'rem'
            };
        },
        clickHeader() {
            this.$emit('header-clicked');

            if (this.headerId) {
                this.$router.push(`/singer/${this.headerId}`);
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
