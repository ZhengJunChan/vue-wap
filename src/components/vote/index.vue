<!-- [vote_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="vote_component">
        <div class="user_label">
            <header-img class="header" :size="90"
            :headerId="$store.state.user.infos.id"
            :header-img="$store.state.user.infos.head_info.link"
            @header-clicked="!$store.state.user.isLogined && login()"></header-img>
            <div class="name_label">
                <span class="name" v-text="$store.state.user.infos.nickname"></span>
                <span v-show="!$store.state.user.isLogined" @click="login">还没登录呢</span>
            </div>
            <span class="tip" @click="$store.dispatch('logout')" v-show="$store.state.user.isLogined">切换账号</span>
        </div>
        <slot class="content"></slot>
    </div>
</template>

<script type="text/javascript">
import HeaderImg from './../header-img';

export default {
    components: {
        HeaderImg
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                vue: this
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
