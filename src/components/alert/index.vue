<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="alert_component">
        <share-tip v-if="type === 'share-tip'" />
        <login v-if="type === 'login'" :options="options"/>
    </div>
</template>

<script type="text/javascript">
import components from './components.js';

export default {
    components: { ...components },
    props: {
        type: '',
        options: null
    }
};
</script>
<style lang="less" scoped>
    @import './main.less';
</style>
