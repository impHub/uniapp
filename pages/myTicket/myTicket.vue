<template>
	<view class="wrap">
			<u-card v-for="item in questionsList" :key="item.id" :title="item.title" :sub-title="item.subTitle">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between ">
						<view class="u-body-item-title">{{item.questionNotes}}</view>
					</view>
				</view>
				<view class="" slot="foot">工单状态：{{item.status}}</view>
			</u-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			questionsList:[
				{
					id:1,
					title: '门禁问题',
					subTitle: '2020-06-15',
					status:'处理中',
					questionNotes:'西南门门禁无法通过，请处理，西南门门禁无法通过，请处理，西南门门禁无法通过，请处理，'
				},
				{
					id:2,
					title: '物业问题',
					subTitle: '2020-07-15',
					status:'处理中',
					questionNotes:'小区有流浪狗，非常危险'
				},
				{
					id:3,
					title: '门禁问题',
					subTitle: '2020-03-15',
					status:'处理中',
					questionNotes:'卡掉了怎么办'
				},
				{
					id:4,
					title: '车辆问题',
					subTitle: '2020-01-15',
					status:'已处理',
					questionNotes:'车找不到了，麻烦帮下忙'
				}
			]
			
		};
	}
};
</script>

<style scoped lang="scss">
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
