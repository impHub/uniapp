<template>
	<u-grid :col="4">
		<u-grid-item v-for="(item, index) in list" :key="index" @click="add(item)">
			<u-icon :name="item.icon" :size="66"></u-icon>
			<view class="grid-text">{{item.name}}</view>
		</u-grid-item>
	</u-grid>
</template>

<script>
	export default {
		methods:{
			add(item){
				console.log(item)
				this.$u.route(item.url);
			}
		},
		data() {
			return {
				list: [
					{name: '社会保障', icon: 'man-add', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A01'},
					{name: '职业资格', icon: 'edit-pen', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A02'},
					{name: '教育考试', icon: 'file-text', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A04'},
					{name: '公积金', icon: 'red-packet', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A05'},
					{name: '公安服务', icon: 'home', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A06'},
					{name: '文化旅游', icon: 'bag', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A07'},
					{name: '交通出行', icon: 'car', url: 'http://zwfw.hubei.gov.cn/web/hb/static/web/bmfw/bmfw_check.html?bmfwId=101033&region_code=420000000000'},
					{name: '就业创业', icon: 'level', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A10'},
					{name: '环境气象', icon: 'bookmark', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=105'},
					{name: '福利救助', icon: 'heart', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=106'},
					{name: '法律服务', icon: 'info-circle', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=110'},
					{name: '政务综合', icon: 'list-dot', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A11'},
					{name: '统计查询', icon: 'search', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=112'},
					{name: '电力服务', icon: 'star', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=113'},
					{name: '医疗健康', icon: 'calendar', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=202008271100'},
					{name: '农业农村', icon: 'hourglass', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A13'},
					{name: '其他服务', icon: 'bookmark', url: 'http://zwfw.hubei.gov.cn/s/web/bmfw/bmfw-list.html?folderid=A12'},
					{name: '资质认证', icon: 'checkmark-circle', url: 'http://zwfw.hubei.gov.cn/s/web/fw/frfw.html?type=zt&code=015'},
					{name: '年检年审', icon: 'checkmark-circle-fill', url: 'http://zwfw.hubei.gov.cn/s/web/fw/frfw.html?type=zt&code=020'},
					{name: '更多', icon: 'more-dot-fill', url: 'http://zwfw.hubei.gov.cn/s/index.html'},
				]
			};
		},
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>