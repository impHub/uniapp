<template>
	<view class="wrapper">
		<view class="pay wx_pay" @click="onClickWx">
			<view class="pay_left">
				<u-icon name="weixin-fill" color="#00d500" size="140"></u-icon>
			</view>
			<view class="pay_right">
				<view class="title">
					微信缴费
				</view>
				<view class="detial">
					水电费|燃气费|电话费
				</view>
			</view>
		</view>
		<view class="pay ali_pay" @click="onClickAli">
			<view class="pay_left">
				<u-icon name="zhifubao-circle-fill" color="#027AFF" size="140"></u-icon>
			</view>
			<view class="pay_right">
				<view class="title">
					支付宝缴费
				</view>
				<view class="detial">
					水电费|燃气费|固话费|宽带费
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			onClickWx() {
				console.log('点了微信', this)
				//此处需要使用微信小程序跳转,参考文档地址
				//https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html
				//https://developers.weixin.qq.com/community/develop/article/doc/0006c218d103a089e79a8720a56813
				// this.$u.route('https://www.baidu.com/')
			},
			onClickAli() {
				console.log('点了阿里')
				this.$u.route('https://m.alipay.com/4rGLYmW')
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		width: 750rpx;
		background-color: #fff;
		min-height: 100vh;
		padding: 50rpx;
		display: flex;
		flex-direction: column;

		.pay {
			width: 100%;
			height: 250rpx;
			background-color: #fff;
			box-shadow: 0px -2px 16px 0px rgba(144, 147, 153, 0.32);
			padding: 50rpx;
			display: flex;
			align-items: center;

			.pay_right {
				margin-left: 20rpx;

				.title {
					font-size: 38rpx;
					font-weight: bold;
					margin-bottom: 8rpx;
				}
			}

			&.wx_pay {}

			&.ali_pay {
				margin-top: 50rpx;
			}
		}
	}
</style>
