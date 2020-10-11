<template>
  <view class="wrap">
    <u-cell-group>
      <u-cell-item icon="calendar" title="车牌号"></u-cell-item>
      <u-cell-item icon="car" title="汽车品牌" value="新版本"></u-cell-item>
      <u-button class="wrap_del" type="error">删除</u-button>
    </u-cell-group>
	<view class="wrap_add">
		<u-button type="success" @click="add">添加</u-button>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {
    this.$u.auth(this.$route.fullPath);
  },
  onBackPress() {
    this.$u.auth(this.$route.fullPath);
  },
};
</script>

<style lang="scss">
.wrap{
	// padding: 20rpx;
	.wrap_del{
		width: 90%;
	}
	.wrap_add{
		width: 20%;
		margin-top: 100rpx;
	}
}
</style>
