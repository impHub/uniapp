<template>
	<view class="content">
		<view class="main">
			 <seek-community-select/>
			<!-- <seek-notice/>  -->
			<banner/>
			<grid/>
		</view>
		<seek-tabbar></seek-tabbar>
	</view>
</template>

<script>
	// import notice from '@/components/notice.vue'
	import seekCommunitySelect from '@/components/community-select.vue'
	import seekTabbar from '@/components/tabbar.vue'
	import banner from './banner.vue'
	import grid from './grid.vue'
	export default {
		components:{
			banner,
			grid,
			seekTabbar,
			seekCommunitySelect
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
	}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 12px;
}
</style>
