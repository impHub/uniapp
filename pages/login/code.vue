<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 {{displayMobile}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text v-show="error">验证码错误，请重新输入</text>
			<view class="captcha">
				<u-verification-code :keep-running="true" :seconds="second" ref="uCode" @change="codeChange" startText="获取验证码" changeText="X秒后重新获取获取验证码" endText="没有收到验证码？点此重发。"></u-verification-code>
				<view @click="sendCaptcha">{{tips}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			maxlength: 4,
			value: '',
			second: 10,
			tips: '',
			showtips: false,
			error: false
		};
	},
	computed:{
		displayMobile: vm => vm.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
	},
	onLoad(option) {
		if(option.mobile){
			this.mobile = option.mobile
			this.$nextTick(_=>{
				this.sendCaptcha()
			})
		}else{
			this.$u.route('/pages/login/index')
		}
	},
	methods: {
		codeChange(text) {
			this.tips = text;
		},
		// 收不到验证码选择时的选择
		async sendCaptcha() {
			// 判断是否正在计时
			if(this.$refs.uCode.canGetCode && this.$u.test.mobile(this.mobile)) {
				// 如果请求返回错误会拦截堵塞，所以不用判断可以直接在后面写语法成功后的逻辑
				await this.$u.api.sendCaptcha({mobile: this.mobile})
				// this.mobile = ''
				this.$u.toast('验证码已发送')
				this.$refs.uCode.start()
			}else{
				console.log('倒计时结束后再发送')
			}
		},
		// change事件侦听
		change(value) {
			// console.log('change', value);
		},
		// 输入完验证码最后一位执行
		finish(value) {
			this.$u.api.login({
				mobile: this.mobile,
				code: value
			}).then(data => {
				this.$u.login(data)
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
