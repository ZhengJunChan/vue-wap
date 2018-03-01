<template>
  <div class="home_page">
    <div class="input_label">
    	<label>姓名</label>
    	<div class="input_box">
    		<input type="text" placeholder="请输入你的真实姓名" v-model="formData.name.val" maxlength="12">
        </div>

        <div class="error" v-text="formData.name.error"></div>
    </div>
    <div class="input_label">
    	<label>性别</label>
    	<div class="input_box sex">
            <span class="boy" @click="formData.sex.val=1" :class="{'selected': formData.sex.val===1}">男</span>
    		<span class="girl" @click="formData.sex.val=0" :class="{'selected': formData.sex.val===0}">女</span>
    	</div>

        <div class="error" v-text="formData.sex.error"></div>
    </div>
    <div class="input_label">
    	<label>院系</label>
    	<div class="input_box">
    		<input type="text" placeholder="请输入你的学院名称" v-model="formData.school.val" maxlength="30">
        </div>

        <div class="error" v-text="formData.school.error"></div>
    </div>
    <div class="input_label">
    	<label>电话</label>
    	<div class="input_box">
    		<input type="tel" placeholder="请输入你的联系方式" v-model="formData.mobile.val" maxlength="11">
        </div>

        <div class="error" v-text="formData.mobile.error"></div>
    </div>

    <div class="submit_box">
        <button @click="submit" :disabled="submiting" v-text="this.submiting ? '提交中' : '我要报名'"></button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { RegularUtil, RouterUtil } from '@/utils';
import DreamApi from './../dream-api.js';

export default {
    data() {
        return {
            submiting: false,
            formData: {
                name: {
                    val: '',
                    error: '',
                    empty: '您输入的名字太多或者太少了'
                },
                sex: {
                    val: '',
                    error: '',
                    empty: '快告诉我们你是男是女？！'
                },
                school: {
                    val: '',
                    error: '',
                    empty: '您还没输入您的院系呢'
                },
                mobile: {
                    val: '',
                    error: '',
                    empty: '快输入你的手机号'
                }
            }
        };
    },
    methods: {
        submit() {
            if (this.submiting) {
                return;
            }

            if (this.isEmpty() || !this.validMobile()) {
                return;
            }

            let params = {
                name: this.formData.name.val,
                sex: this.formData.sex.val,
                school: this.formData.school.val,
                mobile: this.formData.mobile.val
            };

            DreamApi.enroll(params).then((res) => {
                if (res.code !== 200) {
                    this.formData.mobile.error = res.msg;
                    return;
                }

                RouterUtil.go('/2017school/share', this.$router);
            }, (error) => {
                this.formData.mobile.error = error.msg || '报名失败啦！';
            });
        },
        isEmpty() {
            let key = '';
            let errorCount = 0;

            for (key in this.formData) {
                if (this.formData[key].val || typeof this.formData[key].val === 'number') {
                    this.formData[key].error = '';
                } else {
                    errorCount++;
                    this.formData[key].error = this.formData[key].empty;
                }
            }

            return errorCount > 0;
        },
        validMobile() {
            if (!RegularUtil.isMobile(this.formData.mobile.val)) {
                this.formData.mobile.error = '你见过这样的手机号么?给我重输！';
                return false;
            }

            return true;
        }
    }
};
</script>

<style lang="less" scoped>
  @import './main.less';
</style>
