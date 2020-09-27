<template>
	<view class="container">
		<view class="main">
		<view class="u-flex user-box u-p-20">
			<view class="u-m-r-20">
				<u-avatar :src="photo" size="140" mode="square"></u-avatar>
			</view>
			<view class="u-flex-1">
				<template v-if="vuex_token">
					<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
					<view class="u-font-14 u-tips-color">手机号:{{vuex_user.mobile}}</view>
				</template>
				<template v-else>
					<navigator url="/pages/login/index">点此登录</navigator>
				</template>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20 disabled">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="handlerClick"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="收藏" @click="handlerClick"></u-cell-item>
				<u-cell-item icon="photo" title="相册" @click="handlerClick"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券" @click="handlerClick"></u-cell-item>
				<u-cell-item icon="heart" title="关注" @click="handlerClick"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item class="logout" v-if="vuex_token" icon="account" title="退出登录" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
		</view>
		<seek-tabbar/>
	</view>
</template>

<script>
	import seekTabbar from '@/components/tabbar.vue'
	export default {
		components:{
			seekTabbar
		},
		data() {
			return {
				photo:'',
				show:true
			}
		},
		onLoad() {
			
		},
		methods: {
			handlerClick(){
				this.$u.toast('功能建设中')
			},
			logout(){
				this.$u.api.logout()
				this.$u.logout()
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	.camera{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		background-color: #fff;
	}
	.logout{
		color: #FFFFFF;
		background-color: #dd6161 !important;
	}
}
</style>
