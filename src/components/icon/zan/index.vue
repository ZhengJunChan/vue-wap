<!-- [zan_component]   @Author: 郑君婵   @DateTime: 2017-07-04 -->
<template>
  <div class="zan_component" :class="isSelected && 'selected'" @click.stop="changeAgree">
    <span class="animation_img"></span>
    <span v-text="count == 0 ? '赞' : count"></span>
  </div>
</template>

<script>
import ZanApi from './api.js';

export default {
    props: {
        item: {
            type: Object
        },
        id: [Number, String],
        type: [Number, String],
        value: {
            type: [Number, String],
            default: 0
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isSelected: false
        };
    },
    computed: {
        count: {
            get() {
                return Number(this.value);
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    created() {
        this.initStatus();
    },
    methods: {
        initStatus() {
            this.isSelected = this.selected;
        },
        changeAgree() {
            let params = {
                item_id: this.id,
                type: this.type
            };

            ZanApi.changeStatus(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                }

                this.count += Number(res.data);
                this.isSelected = Number(res.data) > 0;
            }, error => {
                this.isSelected = true;
                this.$toast.error(error.msg);
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
