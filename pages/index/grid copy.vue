<template>
	<view class="container">
		<view class="leaf">
			<view class="item" v-for="item in menu" :key="item.id" :class="{'disabled': item.disabled}" @click="handlerClick(item)">
				<view class="box u-border shadow">
					<u-icon class="icon" :name="item.icon" custom-prefix="witcom-icon" size="60" :style="{color: item.color}"></u-icon>
					<view class="label">
						<view class="title">{{item.label}}</view>
						<view class="dec">{{item.dec}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grid">
			<u-grid :col="5" :border="true" class="shadow">
				<u-grid-item v-for="item in grid" :key="item.id" :class="{'disabled': item.disabled}" @click="handlerClick(item.disabled ? false : item.id)">
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
				list: null
			}
		},
		computed: {  
			...mapState(['vuex_token'])
		},
		watch: {
			vuex_token: function(val){
				this.getData()
			},
			list: function(val){
				let menu = []
				let grid = []
				val.map(item => {
					if(item.important){
						menu.length < 4 && menu.push(item)
					}else{
						grid.push(item)
					}
				})
				// grid.push({id: 0, label: '更多', icon: 'more', dec: '', color: '#c8c9cc'})
				this.menu = menu
				this.grid = grid
				// this.menu = val.filter(item => !!item.important)
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData(){
				// console.log(await this.$u.api.getMenu())
				this.list = await this.$u.api.getMenu()
			},
			handlerClick(item){
				if(item.disabled){
					this.$u.toast('功能建设中')
					return;
				}
				// this.$u.route({url: '/pages/login/index'})
				this.$u.route(item.url)
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
			margin-top: -60px;
			.item{
				width: 50%;
				padding: 5px 10px;
				box-sizing: border-box;
				
				.box{
					width: 100%;
					background-color: #fff;
					border-radius: 5px;
					padding: 10px;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
					justify-content: center;
					.icon{
						// float: left;
						flex: 1;
						padding: 10px;
						justify-content: center;
					}
					.label{
						flex: 2;
						
						.title{
							display: block;
							font-size: 14px;
							padding: 0 0 10px;
						}
						.dec{
							max-width: 160rpx;
							display: block;
							color: $u-type-info;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
					&::after{
						border-radius: 5px;
					}
				}
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
