<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.url = option.url
		},
		data() {
			return {
				url: '',
				webviewStyles: {
						progress: {
								color: '#FF3333'
						}
				}
			}
		}
	}
</script>

<style>

</style>
