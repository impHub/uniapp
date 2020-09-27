<template>
	<view>
		<u-icon class="link-notice" size="42" name="chat" color="#f4f4f5"></u-icon>
	</view>
</template>

<script>
	export default {
		name: 'seek-notice',
		data() {
			return {
				
			}
		},
		methods: {
			beforeSwitch(index) {
				return true;
			}
		}
	}
</script>

<style scoped lang="scss">
	.link-notice{
		position: absolute;
		top: 10px;
		right: 15px;
		z-index: 999;
	}
</style>
