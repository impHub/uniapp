<template>
	<!-- <view class="empty-container">
		<u-empty text="功能即将开放" mode="permission"></u-empty>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view> -->
	<view class="container">
		<view class="main box-list2">
			<u-cell-group title="小区出入口" :title-style="{borderLeft: '5px solid #f37b1d'}">
				<u-cell-item :icon="item.icon" :title="item.title" :value="item.label" v-for="item in list.filter(d=>d.type==='border')" :key="item.id" @click="openDoor(item.id)"></u-cell-item>
			</u-cell-group>
			<u-cell-group title="单元出入口" :title-style="{borderLeft: '5px solid #8dc63f'}">
				<u-cell-item :icon="item.icon" :title="item.title" :value="item.label" v-for="item in list.filter(d=>d.type==='unit')" :key="item.id" @click="openDoor(item.id)"></u-cell-item>
			</u-cell-group>
			<!-- <view class="box" :class="item.bgcolor" v-for="item in list" :key="item.id" @click="openDoor(item.id)">
			  <view class="title">{{item.title}}</view>
			  <view class="name">{{item.label}}</view>
			  <u-icon class="icon" :name="item.icon"></u-icon>
			</view> -->
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{id: 1, title: '第2栋第1单元', label: '恒大首府', icon: 'lock', bgcolor: 'bg-cyan', type: 'unit'},
					{id: 2, title: '第3栋第2单元', label: '恒大首府', icon: 'lock', bgcolor: 'bg-blue', type: 'unit'},
					{id: 3, title: '第6栋第1单元', label: '恒大首府', icon: 'lock', bgcolor: 'bg-purple', type: 'unit'},
					{id: 11, title: '东大门', label: '恒大首府', icon: 'lock', bgcolor: 'bg-cyan', type: 'border'},
					{id: 12, title: '西南门', label: '恒大首府', icon: 'lock', bgcolor: 'bg-blue', type: 'border'},
					{id: 13, title: '东侧门', label: '恒大首府', icon: 'lock', bgcolor: 'bg-purple', type: 'border'}
				]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData(){
				// this.list = await this.$u.api.getAuthDoor()
			},
			openDoor(id){
				this.$u.toast('此功能即将开放！')
				// this.$u.api.openDoor({id: id}).then(res=>{
				// 	this.$u.toast('开门成功！')
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .empty-container{
	// 	position: absolute;
	// 	width: 100%;
	// 	height: 100%;
	// 	left: 0;
	// 	top: 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// }
	.container{
		// padding-top: 20rpx;
		.box-list{
			// .box{
			// 	width: 48%;
			// 	margin: 0 1% 40rpx;
			// }
			.name{
				padding: 0rpx 0;
			}
		}
	}
</style>
