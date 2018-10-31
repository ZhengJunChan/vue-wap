
<template>
    <div class="will-save-page">
      <div v-html="text2" id="will-save-content">
      </div>
    </div>
</template>
<script type="text/javascript">
    import {createPicture} from './config.js';
    export default {
        props: {
            value: '',
            options: Object
        },
        methods: {
            createPicture: createPicture
        },
        computed: {
            text2() {
                let a = this.options.text.replace(/(\S)/gi, '<span>$1</span>');
                a = a.replace(/\n|\r/ig, '<br>');
                a = a.replace(/\s/ig, ' ');
                return a;
            }
        },
        mounted() {
            let nodes = document.getElementById('will-save-content');
            let spans = nodes.getElementsByTagName('span');
            let x1 = nodes.offsetLeft;
            let y1 = nodes.offsetTop - nodes.offsetHeight / 2;
            let textList = [];
            spans = Array.from(spans);
            spans.map((o) => {
                let x = x1 + o.offsetLeft;
                let y = y1 + o.offsetTop;
                if (y < 300) {
                    textList.push({
                        x: x + 202,
                        y: y + 1016,
                        text: o.innerText
                    });
                }
            });
            (!this.value || !this.value.file) && this.createPicture(Object.assign({}, this.options, {text: textList})).then((e) => {
                this.$emit('isGetPicture', e);
            }).catch((e) => {
                this.$emit('isGetPicture', e);
            });
            this.value && this.value.file && this.$emit('isGetPicture', {data: this.value, code: 200});
        }
    };
</script>
<style lang="less" scoped>
    @import 'index.less';
</style>
