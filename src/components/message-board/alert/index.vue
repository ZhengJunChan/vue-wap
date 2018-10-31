<!-- [message_board_alert_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="message_board_alert_component">
        <div class="close_btn">
            <img @click="close" src="./../../../imgs/2_4_0/icon_liuyan_close@2x.png">
        </div>
        <div class="input_box">
            <h2 class="title" v-text="messageAlert.title"></h2>

            <textarea v-model="message" placeholder="我来说一说~" :maxlength="messageAlert.max" :minlength="messageAlert.min"></textarea>

            <p class="count_tip">{{message.length}}/{{messageAlert.max}}</p>
        </div>
        <div class="share_label" v-show="messageAlert.showShare">
            <span class="share_btn" @click="shareToYYT = !shareToYYT" :style="{backgroundColor: shareToYYT ? messageAlert.btn.validColor : '#fff'}"><i class="iconfont icon-selected" v-show="shareToYYT"></i></span>
            <span @click="shareToYYT = !shareToYYT" :style="{color: shareToYYT ? messageAlert.selectedColor : '#999'}">同步到池塘</span>
        </div>
        <div class="submit_btn">
            <div @click="submit" v-text="messageAlert.btn.text" :class="{valid: message.length >= messageAlert.min}" :style="{
                color: messageAlert.btn.color,
                backgroundColor: message.length < messageAlert.min ? messageAlert.btn.disabledColor : messageAlert.btn.validColor
            }"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import { CommentApi } from '@/api';

export default {
    computed: {
        ...mapState({
            messageAlert: state => state.user.messageAlert
        })
    },
    data() {
        return {
            message: '',
            shareToYYT: true
        };
    },
    methods: {
        close() {
            this.message = '';
            this.$store.commit('closeMessageAlert');
        },
        submit() {
            if (this.message.length < this.messageAlert.min) {
                this.$toast.error(`请至少输入${this.messageAlert.min}个字符`);
                return;
            }

            let params = {
                content: this.message,
                item_id: this.messageAlert.id,
                type: this.messageAlert.type
            };

            if (this.messageAlert.showShare) {
                params.isShare = this.shareToYYT;
            }

            if (this.messageAlert.submit) {
                this.messageAlert.submit(params);
                return;
            }

            CommentApi.submitComment(params).then(res => {
                if (res.code !== 200) {
                    this.$toast.error(res.msg);
                    return;
                }

                this.close();
                this.$emit('on-success', res.data);
            }, error => {
                this.$toast.error(error.msg);
            });
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
