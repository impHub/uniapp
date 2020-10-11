<template>
	<view class="container">
		<u-empty text="功能即将开放" mode="page"></u-empty>
		<template>
	<!-- <u-table>
		<u-tr>
			<u-th>学校</u-th>
			<u-th>班级</u-th>
			<u-th>年龄</u-th>
		</u-tr>
		<u-tr>
			<u-td>浙江大学</u-td>
			<u-td>二年级</u-td>
			<u-td>22</u-td>
		</u-tr>
		<u-tr>
			<u-td>清华大学</u-td>
			<u-td>05班</u-td>
			<u-td>20</u-td>
		</u-tr>
	</u-table> -->
</template>
	</view>
</template>
<script>
// test
import {mapState, mapMutations} from 'vuex'; 
export default {
		mounted() {
			// 访问state的值
			// console.log(this.vuex_token)
			// 触发mutations
			// this.$store.commit('$Test', 'hello')
		},
		computed: {  
			...mapState(['vuex_token'])
		},
	
}
</script>
<style lang="scss" scoped>
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
