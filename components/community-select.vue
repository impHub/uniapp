<template>
	<view>
		<view class="wrap" @click="show=true">
			<u-icon name="map" size="24"></u-icon>
			<text class="text">{{vuex_community.name}}</text>
			<u-icon name="arrow-down" size="22"></u-icon>
		</view>
		<u-action-sheet v-model="show" :list="list" @click="changeCommunity"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		name: 'seek-community-select',
		data(){
			return {
				show: false,
				list: []
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			getData(){
				let data = [
					{
						id: '1',
						name: '小区A'
					},
					{
						id: '2',
						name: '小区B'
					}
				]
				this.list = data.map(d => {
					d.text = d.name
					return d
				})
				this.changeCommunity(0)
			},
			changeCommunity(index) {
				this.$u.vuex('vuex_community', this.list[index])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: absolute;
		left: 5px;
		top: 10px;
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240,240, 240, 0.5);
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
		z-index: 1000;
		
		.text{
			padding: 0 6rpx;
		}
	}
</style>
