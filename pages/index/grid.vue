<template>
	<view class="container">
		<view class="leaf box-list">
			<view class="box" :class="item.bgcolor" v-for="(item,index) in menu" :key="index" @click="handlerClick(item)">
			  <view class="title">{{item.label}}</view>
			  <view class="name">{{item.dec}}</view>
			  <u-icon class="icon" :name="item.icon" custom-prefix="witcom-icon"></u-icon>
			</view>
		</view>
		<view class="grid">
			<u-grid :col="5" :border="true" class="shadow">
				<u-grid-item v-for="item in grid" :key="item.id" :class="{'disabled': item.disabled}" @click="handlerClick(item)">
					<u-icon class="icon" :name="item.icon" custom-prefix="witcom-icon" size="60" :style="{color: item.color}"></u-icon>
					<view class="label">{{item.label}}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'; 
	export default {
		data(){
			return {
				menu: [],
				grid: [],
				list: [
					{ id: 1, important: 1, label: '居民录入', icon: 'guest', dec: '来访人员登记', bgcolor: 'bg-cyan', url: "/pages/user/add" },
					{ id: 2, important: 1, label: '居民审核', icon: 'heart', dec: '审核居民信息', bgcolor: 'bg-blue', url: "http://www.baidu.com" },
					{ id: 3, important: 1, label: '活动', icon: 'party', dec: '最新社区活动', bgcolor: 'bg-purple', disabled: true },
					{ id: 4, important: 1, label: '服务', icon: 'service', dec: '物业便民服务', bgcolor: 'bg-mauve', disabled: true },
					{ id: 5, label: '民生服务', icon: 'handheart', dec: '', bgcolor: 'bg-pink', disabled: true },
					{ id: 6, label: '健康管家', icon: 'health', dec: '', bgcolor: 'bg-brown', disabled: true },
					{ id: 8, label: '报事报修', icon: 'repair', dec: '', bgcolor: 'bg-red', disabled: true },
					{ id: 7, label: '生活缴费', icon: 'tools', dec: '', bgcolor: 'bg-orange', url: "https://billcloud.unionpay.com/ccfront/channel/UP0000A" },
					{ id: 9, label: '快递查询', icon: 'gift', dec: '', bgcolor: 'bg-olive', url: "https://m.kuaidi100.com/app" }
				]
			}
		},
		computed: {  
			...mapState(['vuex_token'])
		},
		watch: {
			// vuex_token: function(val){
			// 	this.getData()
			// }
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData(){
				// this.list = await this.$u.api.getMenu()
				this.calcList()
			},
			calcList(){
				let menu = []
				let grid = []
				this.list.map(item => {
					if(item.important){
						menu.length < 4 && menu.push(item)
					}else{
						grid.push(item)
					}
				})
				this.menu = menu
				this.grid = grid
			},
			handlerClick(item){
				// console.log(item.disabled)
				console.log(this)
				// this.$nexttick(res =>{
				// 	console.log(item.disabled)
				// })
				if(item.disabled){
					// console.log(item);
					// this.$u.toast('功能建设中')
					this.$u.route('pages/system/building')
				}else{
					console.log('身份上传',item.disabled)
					// 跳转到身份上传页
					this.$u.route(item.url)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		
		.leaf{
			position: relative;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			box-align: center;
			// margin-top: -60px;
			padding: 0;
			
			.box{
				width: 45%;
				margin: 0 2.5% 40rpx;
			}
		}
		
		.grid{
			padding: 5px 10px;
			box-sizing: border-box;
			.label{
				color: $u-content-color;
				padding-top: 5px;
			}
			
			
			.u-grid-item{
				
				&:first-child,
				&:last-child{
					border-radius: 5px 0 0 5px;
				}
			}
		}
		
		.disabled{
			.icon,
			.label,
			.dec{
				color: #C0C4CC !important
			}
		}
	}
</style>
