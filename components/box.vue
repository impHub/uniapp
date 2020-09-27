<template>
	<view class="box">
		<view class="title">{{label}}</view>
		<view class="name">{{dec}}</view>
		<u-icon class="icon" :name="icon" custom-prefix="witcom-icon"></u-icon>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			dec: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>

.box{
	padding: 30rpx;
	border-radius: 12rpx;
	width: 45%;
	margin: 0 2.5% 40rpx;
	background-image: url(/images/bg_card.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
	box-sizing: border-box;

	&::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10rpx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
	}

	.title {
		font-size: 32rpx;
		font-weight: 300;
		
		&::first-letter {
			font-size: 40rpx;
			margin-right: 4rpx;
		}
	}

	.name {
		font-size: 28rpx;
		text-transform: Capitalize;
		margin-top: 20rpx;
		position: relative;
	
		&::before {
			content: "";
			position: absolute;
			display: block;
			width: 40rpx;
			height: 6rpx;
			background: #fff;
			bottom: 0;
			right: 0;
			opacity: 0.5;
		}
		&::after {
			content: "";
			position: absolute;
			display: block;
			width: 100rpx;
			height: 1px;
			background: #fff;
			bottom: 0;
			right: 40rpx;
			opacity: 0.3;
		}
		&::first-letter {
			font-weight: bold;
			font-size: 36rpx;
			margin-right: 1px;
		}
	}

	.nav-icon {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 52rpx;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
}
</style>
