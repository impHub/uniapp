<template>
	<u-tabbar
			:beforeSwitch="beforeSwitch"
			v-model="current"
			:show="show"
			:bg-color="bgColor"
			:border-top="borderTop"
			:list="vuex_tabbar"
		:mid-button="midButton"
		:inactive-color="inactiveColor"
		:activeColor="activeColor"
	></u-tabbar>
</template>

<script>
	export default {
		name: 'seek-tabbar',
		data() {
			return {
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
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
</style>
