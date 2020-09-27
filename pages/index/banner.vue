<template>
	<view class="container">
		<image src="@/static/images/banner.png" mode="scaleToFill" class="image"></image>
		<view class="u-font-36">智慧社区移动端</view>
		<view class="u-m-t-20">
			<text>物业版</text>
		</view>
		<image src="@/static/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		mounted() {
			// this.getData()
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		// background-image: url(@/static/banner/1.png);
		background-repeat: no-repeat;
		background-size: cover;
		height: 300rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		margin-bottom: 20px;
		.image{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 99;
			// mix-blend-mode: screen; 
		}
		.gif-wave{
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index: 99;
			mix-blend-mode: screen;  
			height: 100rpx;   
		}
	}
</style>
